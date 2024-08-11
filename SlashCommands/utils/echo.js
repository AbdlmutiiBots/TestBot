const Discord = require("discord.js");

module.exports = {
  name: 'echo',
  description: 'Make the bot repeat after you',
  permissions: {
    bot: [],
    user: ["MANAGE_SERVER"]
  },
  cooldown: '3s',
  catg: 'Utils',
  options: [
    {
      name: 'message',
      type: 'STRING',
      description: 'The message to repeat',
      required: true
    }
  ],
  async run(lb, bot, db) {
    const message = lb.options.getString('message');
    lb.reply(message);
  }
};

