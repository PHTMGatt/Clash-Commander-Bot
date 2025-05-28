//src\jobs\'scheduleRaidReminders.js'

const cron = require('node-cron');
const { sendRaidReminders } = require('../features/raid/sendRaidReminders');

function scheduleRaidReminders(client) {
  // Friday at 12PM EST
  cron.schedule('0 17 * * 5', () => {
    console.log('📣 Sending Raid Start Reminder');
    sendRaidReminders(client);
  });

  // Sunday at 3PM EST
  cron.schedule('0 20 * * 0', () => {
    console.log('📣 Sending Mid-Raid Reminder');
    sendRaidReminders(client);
  });

  // Sunday at 10PM EST
  cron.schedule('0 3 * * 1', () => {
    console.log('📣 Sending Final Raid Reminder');
    sendRaidReminders(client);
  });
}

module.exports = { scheduleRaidReminders };
