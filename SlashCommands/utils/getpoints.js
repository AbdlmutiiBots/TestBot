const Discord = require("discord.js");

module.exports = {
  name: 'getpoints',
  description: 'Check the points of a user',
  permissions: {
    bot: [],
    user: []
  },
  cooldown: '5s',
  catg: 'Owner',
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'The user to check points for',
      required: false
    }
  ],
  async run(lb, bot, db) {
    let user = lb.options.getUser('user') || lb.user;

    let conn;
    try {
      conn = await db.getConnection();
      let result = await conn.query("SELECT points FROM user_points WHERE guild_id = ? AND user_id = ?", [lb.guild.id, user.id]);
      let points = result.length ? result[0].points : 0;
      lb.reply(`**${user.username}** has ${points} points.`);
    } catch (err) {
      console.error(err);
      lb.reply("There was an error retrieving points.");
    } finally {
      if (conn) conn.release();
    }
  }
};

