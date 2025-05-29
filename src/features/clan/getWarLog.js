// src/features/clan/getWarLog.js

const axios = require('axios');
require('dotenv').config();

const CLASH_API = 'https://api.clashofclans.com/v1';
const CLAN_WARLOG_ENDPOINT = '/clans/';

const HEADERS = {
  Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
};

function sanitizeTag(tag) {
  return encodeURIComponent(tag.replace('#', ''));
}

async function getWarLog(clanTag, limit = 10) {
  const url = `${CLASH_API}${CLAN_WARLOG_ENDPOINT}${sanitizeTag(clanTag)}/warlog?limit=${limit}`;

  try {
    const { data } = await axios.get(url, { headers: HEADERS });
    return data.items.map(war => ({
      result: war.result,
      teamSize: war.teamSize,
      clan: {
        name: war.clan.name,
        stars: war.clan.stars,
        attacks: war.clan.attacks,
      },
      opponent: {
        name: war.opponent.name,
        stars: war.opponent.stars,
        attacks: war.opponent.attacks,
      },
      endTime: war.endTime
    }));
  } catch (err) {
    console.error('❌ Error fetching war log:', err?.response?.data || err.message);
    throw new Error('Failed to fetch war log. Make sure your war log is public.');
  }
}

module.exports = getWarLog;
