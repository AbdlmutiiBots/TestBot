const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: "hello",
  description: 'Greets you!',
  aliases: ["hi"],
  usage: '!hello',
  example: '!hello',
  catg: 'Utils',
  cooldown: "3s",
  owner: false,
  permissions: {
    user: [],
    bot: [],
  },
  path: "utils/hello.js",
  run: async (lb, lbargs, bot, db, Discord) => {
    let emjs = ["👋🏼", "😊", "👐", "🙌", "🌟", "💬", "🤗", "🎉", "👍", "❤️"];
    let randomIndex = Math.floor(Math.random() * emjs.length);
    lb.reply(`Hello, ${lb.user.globalName}. Nice to meet you ${emjs[randomIndex]}`); 
  },
};
