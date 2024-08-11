const Discord = require("discord.js");

module.exports = {
  name: 'assignrole',
  description: 'Assign a role to a user',
  permissions: {
    bot: ["MANAGE_ROLES"],
    user: ["MANAGE_ROLES"]
  },
  cooldown: '5s',
  catg: 'Moderators',
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'The user to assign the role to',
      required: true
    },
    {
      name: 'role',
      type: 'ROLE',
      description: 'The role to assign',
      required: true
    }
  ],
  async run(lb, bot, db) {
    let user = lb.options.getMember('user');
    let role = lb.options.getRole('role');

    if(lb.member.roles.highest.position < user.roles.highest.position) {
      return lb.reply(`**${user.displayName}** has a higher role than you.`);
    }
    if(lb.guild.me.roles.highest.position < role.position) {
      return lb.reply(`This role is higher than my role.`);
    }
    if(role.position > lb.member.roles.highest.position) {
      return lb.reply(`This role is higher than your role.`);
    }

    user.roles.add(role);
    lb.reply(`**Assigned ${role.name} to ${user.user.username}**`);
  }
};

