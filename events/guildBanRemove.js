const db = require("../db.js");

module.exports = {
  name: `guildBanRemove`,
  once: false,
  run: async() => {
 let conn;
                conn = await db.getConnection();
                let logs = await conn.query("SELECT logs_channel FROM guild_settings WHERE guild_id = ?", [lb.guild.id]);
        if(logs.length > 0) {
    guild.channels.cache.get(logs[0].logs_channel).send(`**${user.name}** Got unbanned.`);
          }
    }
  }
