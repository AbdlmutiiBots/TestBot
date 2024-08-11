const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');

module.exports = {
  name: "help",
  description: "Get a list of commands",
  aliases: ["h"],
  usage: "!help [command]",
  example: "!help ping",
  catg: "Utils",
  cooldown: "3s",
  owner: false,
  permissions: {
    user: [],
    bot: [],
  },
  path: "utils/help.js",
  run: async (lb, lbargs, bot, db) => {
    const { channel } = lb;
    let author = lb.user;
    const categories = readdirSync('./commands/');
    const embed = new MessageEmbed()
      .setTitle("Help Menu")
      .setThumbnail(lb.guild.me.displayAvatarURL({ dynamic: true }))
      .setColor('DARK_VIVID_PINK')
      .setFooter(`Requested by ${author.username}`, author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    categories.forEach(category => {
      const commandFiles = readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));
      const commands = commandFiles.map(file => {
        if(category === "owner" && file === "getpoints.js") return;
        const command = require(`../${category}/${file}`);
        return `**${command.name}** - ${command.description}\nUsage: \`${command.usage || "!" + command.name}\`\nExample: \`${command.example || "none"}\``;
      });

      if (commands.length > 0) {
        embed.addField(`**${category.toUpperCase()}**`, commands.join('\n\n'));
      }
    });

    channel.send({ embeds: [embed] });
  },
};
