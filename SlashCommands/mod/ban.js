const Discord = require("discord.js");

module.exports = {
  name: 'ban',
  description: 'Ban a user from the server',
  permissions: {
    bot: ["BAN_MEMBERS"],
    user: ["BAN_MEMBERS"]
  },
  cooldown: '5s',
  catg: 'Moderators',
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'The user to ban',
      required: true
    }
  ],
  async run(lb, bot, db) {
    let user = lb.options.getMember('user');

    if (lb.member.roles.highest.position < user.roles.highest.position) {
      return lb.reply(`**${user.displayName}** is higher than your role. You cannot ban them.`);
    }
    if (lb.guild.me.roles.highest.position < user.roles.highest.position) {
      return lb.reply(`**${user.displayName}** is an admin/mod, I can't do that.`);
    }

    try {
      await user.send(`You've been banned from ${lb.guild.name}`);
    } catch (err) {
      console.error(`Could not send ban DM to ${user.user.tag}.`);
    }

    await user.ban();
    lb.reply(`🥊 **${user.displayName}** has been banned successfully.`);
  }
};

