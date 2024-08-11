const fs = require('fs');
const path = require('path');
const Discord = require("discord.js");

module.exports = {
  async run(bot, db) {
    const eventDir = path.join(process.cwd(), 'events');
    console.log(`Loading events from: ${eventDir}`);

    const eventFiles = fs.readdirSync(eventDir).filter(file => file.endsWith('.js'));
    console.log(`Found event files: ${eventFiles.join(', ')}`);

    for (const file of eventFiles) {
      const filePath = path.join(eventDir, file);
      console.log(`Loading event file: ${filePath}`);
      
      const event = require(filePath);
      if (event.once) {
        console.log(`Registering event: ${event.name} (once)`);
        bot.once(event.name, (...args) => event.run(...args, bot));
      } else {
        console.log(`Registering event: ${event.name}`);
        bot.on(event.name, (...args) => event.run(...args, bot));
      }
    }
    console.log("All events loaded.");
  }
};

