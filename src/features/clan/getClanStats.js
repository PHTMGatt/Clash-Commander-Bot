// src/features/clan/getClanStats.js

const axios = require('axios');
require('dotenv').config();

const CLASH_API = 'https://api.clashofclans.com/v1';
const CLAN_ENDPOINT = '/clans/';

const HEADERS = {
  Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
};

function sanitizeTag(tag) {
  return encodeURIComponent(tag.replace('#', ''));
}

async function getClanStats(clanTag) {
  const url = `${CLASH_API}${CLAN_ENDPOINT}${sanitizeTag(clanTag)}`;

  try {
    const { data } = await axios.get(url, { headers: HEADERS });

    return {
      name: data.name,
      tag: data.tag,
      members: data.members,
      warWins: data.warWins,
      level: data.clanLevel,
      description: data.description,
      location: data.location?.name || 'International',
    };
  } catch (err) {
    console.error('❌ Error fetching clan stats:', err?.response?.data || err.message);
    throw new Error('Failed to fetch clan stats. Please check the clan tag.');
  }
}

module.exports = getClanStats;
