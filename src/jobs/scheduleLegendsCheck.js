//src\jobs\'scheduleLegendsCheck.js'

const cron = require('node-cron');
const { trackLegendAttacks } = require('../features/legends/trackLegendAttacks');

function scheduleLegendsCheck(client) {
  // Runs daily at 8 PM UTC
  cron.schedule('0 20 * * *', () => {
    console.log('🔁 Running daily Legend League check...');
    trackLegendAttacks(client);
  });
}

module.exports = { scheduleLegendsCheck };
