//src\features\linking\'handleLink.js'

const axios = require('axios');
const config = require('../../config/clan');

async function getPlayerData(tag) {
  try {
    const cleanTag = tag.replace('#', '');
    const res = await axios.get(`https://api.clashofclans.com/v1/players/%23${cleanTag}`, {
      headers: { Authorization: `Bearer ${config.cocApiToken}` }
    });
    return res.data;
  } catch (err) {
    console.error('❌ Error fetching player:', err.response?.data || err.message);
    return null;
  }
}

module.exports = { getPlayerData };
