//src\features\war\'pingUnhitMembers.js'

const axios = require('axios');
const config = require('../../config/clan');
const channels = require('../../config/channels');

async function pingUnhitMembers(client) {
  try {
    const clanTag = config.clanTag.replace('#', '%23');
    const warRes = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}/currentwar`, {
      headers: { Authorization: `Bearer ${config.cocApiToken}` }
    });

    const warData = warRes.data;
    if (!warData?.clan?.members?.length) return;

    const unhit = warData.clan.members.filter(m => m.attacks == null);

    if (!unhit.length) return;

    const warChannel = client.channels.cache.get(channels.alerts.war);
    if (!warChannel) return;

    const mentions = unhit.map(m => `• ${m.name}`).join('\n');

    await warChannel.send(`⚠️ **Unhit Players in War:**\n${mentions}`);
  } catch (err) {
    console.error('⚔️ Error pinging unhit war members:', err.message);
  }
}

module.exports = { pingUnhitMembers };
