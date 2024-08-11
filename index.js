const Discord = require('discord.js');
require("dotenv").config();
const prettyMilliseconds = require('pretty-ms');
const ms = require('ms');
const db = require("./db.js")
const bot = new Discord.Client({ intents: 32767 });
bot.config = {
  prefix: "!",
  owners: ["630857610350034980"]
}

bot.once('ready', async() => {
    console.log(`󱚣 Logged in as ${bot.user.tag}`);
});

require("./event.js").run(bot);
require("./slash.js").run(bot, db);
bot.login();
