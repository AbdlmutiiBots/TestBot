const Discord = require("discord.js");

module.exports = {
  name: 'removerole',
  description: 'Remove a role from a user',
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
      description: 'The user to remove the role from',
      required: true
    },
    {
      name: 'role',
      type: 'ROLE',
      description: 'The role to remove',
      required: true
    }
  ],
  async run(lb, bot, db) {
    let user = lb.options.getMember('user');
    let role = lb.options.getRole('role');

    if(lb.member.roles.highest.position < user.roles.highest.position) {
      return lb.reply(`**${user.displayName}** has a higher role than you.`);
    }
    if(lb.guild.me.roles.highest.position < user.roles.highest.position) {
      return lb.reply(`**${user.displayName}** has a higher role than my role.`);
    }
    if(role.position > lb.member.roles.highest.position) {
      return lb.reply(`This role is higher than your role.`);
    }

    user.roles.remove(role);
    lb.reply(`**Un-assigned ${role.name} from ${user.user.username}**`);
  }
};

