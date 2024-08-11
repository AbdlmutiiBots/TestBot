const Discord = require("discord.js");
const db=require("../../db.js")
module.exports = {
  name: 'addpoints',
  description: 'Add points to a user',
  permissions: {
    bot: [],
    user: ["ADMINISTRATOR"]
  },
  cooldown: '5s',
  catg: 'Owner',
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'The user to add points to',
      required: true
    },
    {
      name: 'points',
      type: 'INTEGER',
      min_value: 1,
      max_value: 10000,
      description: 'The number of points to add',
      required: true
    }
  ],
  async run(lb, bot) {
    let user = lb.options.getMember('user');
    let points = lb.options.getInteger('points');
    if(points <= 0) return;
    let conn;
    try {
      conn = await db.getConnection();
      let currentPoints = await conn.query("SELECT points FROM user_points WHERE guild_id = ? AND user_id = ?", [lb.guild.id, user.id]);

      currentPoints = currentPoints.length ? currentPoints[0].points : 0;

      await conn.query("INSERT INTO user_points (guild_id, user_id, points) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE points = points + ?", [lb.guild.id, user.id, points, points]);

      lb.reply(`${points} points have been added to **${user.displayName}**. They now have ${currentPoints + points} points.`);
    } catch (err) {
      console.error(err);
      lb.reply("There was an error adding points.");
    } finally {
      if (conn) conn.release();
    }
  }
};

