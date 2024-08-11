const pool = require('../db.js');

module.exports = {
  name: "guildMemberAdd",
  run: async (m) => {
    let conn;
    try {
      conn = await pool.getConnection();
      let result = await conn.query("SELECT welcome_message, welcome_channel FROM guild_settings WHERE guild_id = ?", [m.guild.id]);

      let welcomeMessage = result.length ? result[0].welcome_message : "Welcome to the server!";
      let welcomeChannelId = result.length ? result[0].welcome_channel : null;

      if (welcomeChannelId) {
        let welcomeChannel = m.guild.channels.cache.get(welcomeChannelId);
        if (welcomeChannel) {
          welcomeChannel.send(welcomeMessage.replace("{user}", m.user.username));
        } else {
          console.error("The welcome channel ID stored in the database is invalid.");
        }
      } else {
        console.error("No welcome channel set.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }
};

