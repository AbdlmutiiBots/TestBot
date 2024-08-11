const Discord = require("discord.js");

module.exports = {
  name: 'setwelcome',
  description: 'Set a custom welcome message for new members',
  permissions: {
    bot: [],
    user: ["ADMINISTRATOR"]
  },
  cooldown: '5s',
  catg: 'Owner',
  options: [
    {
      name: 'message',
      type: 'STRING',
      description: 'The welcome message to set',
      required: true
    }
  ],
  async run(lb, bot, db) {
    const welcomeMessage = lb.options.getString('message');
    if (!welcomeMessage) return lb.reply("Please provide a welcome message.");

    let conn;
    try {
      conn = await db.getConnection();
      await conn.query("INSERT INTO guild_settings (guild_id, welcome_message) VALUES (?, ?) ON DUPLICATE KEY UPDATE welcome_message = ?", [lb.guild.id, welcomeMessage, welcomeMessage]);
      lb.reply("Welcome message has been set!");
    } catch (err) {
      console.error(err);
      lb.reply("There was an error setting the welcome message.");
    } finally {
      if (conn) conn.release();
    }
  }
};
