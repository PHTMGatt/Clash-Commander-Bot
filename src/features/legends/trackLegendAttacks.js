//src\features\legends\'trackLegendAttacks.js'

const axios = require('axios');
const User = require('../../models/User');
const config = require('../../config/clan');

async function trackLegendAttacks(client) {
  const users = await User.find();

  for (const user of users) {
    try {
      const res = await axios.get(
        `https://api.clashofclans.com/v1/players/%23${user.playerTag.replace('#', '')}`,
        { headers: { Authorization: `Bearer ${config.cocApiToken}` } }
      );

      const data = res.data;
      if (!data?.legendStatistics) continue;

      const attacksToday = data.legendStatistics?.attacks || 0;

      if (attacksToday < 8) {
        const discordUser = await client.users.fetch(user.discordId);
        if (discordUser) {
          await discordUser.send(`🏹 You’ve only used ${attacksToday}/8 Legend League attacks today. Don't miss out!`);
        }
      }
    } catch (err) {
      console.error(`Error tracking legends for ${user.playerTag}:`, err.message);
    }
  }
}

module.exports = { trackLegendAttacks };
