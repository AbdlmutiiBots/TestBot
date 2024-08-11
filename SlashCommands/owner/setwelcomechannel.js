const Discord = require("discord.js");
const pool = require('../../db.js');

module.exports = {
  name: 'setwelcomechannel',
  description: 'Set a custom welcome channel for new members',
  permissions: {
    bot: [],
    user: ["ADMINISTRATOR"]
  },
  cooldown: '5s',
  catg: 'Owner',
  options: [
    {
      name: 'channel',
      type: 'CHANNEL',
      description: 'The channel to set as the welcome channel',
      required: true
    }
  ],
  async run(lb, bot, db) {
    let channel = lb.options.getChannel('channel');
    if (!channel) return lb.reply("Please mention a valid channel.");

    let conn;
    try {
      conn = await db.getConnection();
      await conn.query("INSERT INTO guild_settings (guild_id, welcome_channel) VALUES (?, ?) ON DUPLICATE KEY UPDATE welcome_channel = ?", [lb.guild.id, channel.id, channel.id]);
      lb.reply(`Welcome channel has been set to ${channel.name}!`);
    } catch (err) {
      console.error(err);
      lb.reply("There was an error setting the welcome channel.");
    } finally {
      if (conn) conn.release();
    }
  }
};

