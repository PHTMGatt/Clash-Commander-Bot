//src\features\linking\'assignTownHallRole.js'

const { getTownHallRole } = require('../../utils/getTownHallRole');

async function assignTownHallRole(member, townHall, guild) {
  const roleName = getTownHallRole(townHall);
  if (!roleName) return;

  const role = guild.roles.cache.find(r => r.name === roleName);
  if (role) {
    await member.roles.add(role).catch(console.error);
  }
}

module.exports = { assignTownHallRole };
