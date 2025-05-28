//src\config\'clan.js'

require('dotenv').config();

module.exports = {
  clanTag: process.env.CLAN_TAG || '#VG2UQUVQ',
  playerTag: process.env.PLAYER_TAG || '#2C98QUR88',
  cocApiToken: process.env.COC_API_TOKEN
};
