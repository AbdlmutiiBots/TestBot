const Discord = require("discord.js");

module.exports = {
  name: 'audit',
  description: 'Set a channel for audit logs',
  permissions: {
    bot: [],
    user: []
  },
  cooldown: '3s',
  catg: '',
  options: [
    {
      name: 'channel',
      type: 'CHANNEL',
      description: 'The channel to set as the log channel',
      required: true
    }
  ],
  async run(lb, bot, db) {
    let channel = lb.options.getChannel('channel');
    if (!channel) return lb.reply("Please choose a channel.");

    let conn;
    try {
      conn = await db.getConnection();
      await conn.query("INSERT INTO guild_settings (guild_id, logs_channel) VALUES (?, ?) ON DUPLICATE KEY UPDATE logs_channel = ?", [lb.guild.id, channel.id, channel.id]);
      lb.reply("Log channel has been set.");
    } catch (err) {
      console.error(err);
      lb.reply("There was an error setting the log channel.");
    } finally {
      if (conn) conn.release();
    }
  }
};

