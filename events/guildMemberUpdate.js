const db = require("../db.js");

module.exports = {
  name: `guildMemberUpdate`,
  once: false,
  run: async (oldMember, newMember) => {
    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
      const addedRoles = newMember.roles.cache.difference(oldMember.roles.cache);
      const removedRoles = oldMember.roles.cache.difference(newMember.roles.cache);

      let roleMessage = '';
      if (addedRoles.size > 0) {
        roleMessage += `Roles added: ${addedRoles.map(role => role.name).join(', ')}\n`;
      }
      if (removedRoles.size > 0) {
        roleMessage += `Roles removed: ${removedRoles.map(role => role.name).join(', ')}\n`;
      }

      if (roleMessage) {
        console.log(`User ${newMember.user.tag} role changes:\n${roleMessage}`);
      }
    }

    // Handle timeout changes
    if (oldMember.communicationDisabledUntil !== newMember.communicationDisabledUntil) {
      const timeoutMessage = newMember.communicationDisabledUntil > Date.now()
        ? `**${newMember.user.tag}** has been timed out until ${newMember.communicationDisabledUntil}`
        : `**${newMember.user.tag}** has had their timeout lifted`;
    }

    // Send log message to logs channel
    try {
      const conn = await db.getConnection();
      const [logs] = await conn.query("SELECT logs_channel FROM guild_settings WHERE guild_id = ?", [newMember.guild.id]);
      conn.release();

      if (logs.length > 0) {
        const logsChannel = newMember.guild.channels.cache.get(logs[0].logs_channel);
        if (logsChannel) {
          let logMessage = '';

          if (roleMessage) {
            logMessage += `### Role Changes:\n${roleMessage}`;
          }

          if (newMember.communicationDisabledUntil !== oldMember.communicationDisabledUntil) {
            logMessage += `### Timeout Change:\n${timeoutMessage}`;
          }

          if (logMessage) {
            logsChannel.send(logMessage);
          }
        } else {
          console.error('Logs channel not found.');
        }
      } else {
        console.error('No logs channel found in database.');
      }
    } catch (error) {
      console.error('Error fetching logs channel:', error);
    }
  }
};
