const Discord = require("discord.js");
const ms = require('ms');
const prettyMs = require('pretty-ms');

module.exports = {
  name: 'timeout',
  description: 'Timeout (mute) a user for a specified duration',
  permissions: {
    bot: ["MODERATE_MEMBERS"],
    user: ["MODERATE_MEMBERS"]
  },
  cooldown: '5s',
  catg: 'Moderators',
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'The user to timeout',
      required: true
    },
    {
      name: 'duration',
      type: 'STRING',
      description: 'The duration of the timeout (e.g., 1h, 30m)',
      required: true
    }
  ],
  async run(lb, bot, db) {
    let user = lb.options.getMember('user');
    let duration = lb.options.getString('duration');
    
    if (!duration.endsWith("h") && !duration.endsWith("m") && !duration.endsWith("s") && !duration.endsWith("d")) {
      return lb.reply("Invalid duration format.");
    }
    
    if (duration.startsWith("-") || duration.startsWith("0")) {
      return lb.reply("Invalid Duration.");
    }

    let time = ms(duration);
    if (!time) {
      return lb.reply("Invalid duration!");
    }

    if (lb.member.roles.highest.position <= user.roles.highest.position) {
      return lb.reply(`**${user.displayName}** has a higher or equal role, you cannot timeout them.`);
    }
    
    if (lb.guild.me.roles.highest.position <= user.roles.highest.position) {
      return lb.reply(`**${user.displayName}** has a higher or equal role than me, I cannot timeout them.`);
    }

    await user.timeout(time, `Timeout by ${lb.user.tag}`);
    return lb.reply(`**${user.displayName}** has been timed out for ${prettyMs(time)}.`);
  }
};

      
