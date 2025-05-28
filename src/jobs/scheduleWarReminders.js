//src\jobs\'scheduleWarReminders.js'

const cron = require('node-cron');
const { pingUnhitMembers } = require('../features/war/pingUnhitMembers');

function scheduleWarReminders(client) {
  // Every hour on the hour
  cron.schedule('0 * * * *', () => {
    console.log('⏰ Running War Reminder check...');
    pingUnhitMembers(client);
  });
}

module.exports = { scheduleWarReminders };
