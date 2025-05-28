//src\config\'env.js'

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  discordToken: process.env.DISCORD_BOT_TOKEN,
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3000
};
