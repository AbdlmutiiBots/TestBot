const Discord = require("discord.js");

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  permissions: {
    bot: ["KICK_MEMBERS"],
    user: ["KICK_MEMBERS"]
  },
  cooldown: '5s',
  catg: 'Moderators',
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'The user to kick',
      required: true
    }
  ],
  async run(lb, bot, db) {
    let user = lb.options.getMember('user');

    if (lb.member.roles.highest.position < user.roles.highest.position) {
      return lb.reply(`**${user.displayName}** is higher than your role. You cannot kick them.`);
    }
    if (lb.guild.me.roles.highest.position < user.roles.highest.position) {
      return lb.reply(`**${user.displayName}** is an admin/mod, I can't do that.`);
    }

    try {
      await user.send(`You've been kicked from ${lb.guild.name}`);
    } catch (err) {
      console.error(`Could not send kick DM to ${user.user.tag}.`);
    }

    await user.kick();
    lb.reply(`🥊 **${user.displayName}** has been kicked successfully.`);
  }
};

