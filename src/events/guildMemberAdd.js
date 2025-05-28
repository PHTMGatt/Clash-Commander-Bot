//src\events\'guildMemberAdd.js'

const { roles } = require('../config/roles');
const channels = require('../config/channels');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const unverifiedRole = member.guild.roles.cache.find(r => r.name === roles.onboarding.unverified);
    if (unverifiedRole) await member.roles.add(unverifiedRole).catch(console.error);

    const welcomeChannel = member.guild.channels.cache.get(channels.logs.botLogs);
    if (welcomeChannel) {
      welcomeChannel.send(`👋 Welcome <@${member.id}>! Use \`/link\` to connect your Clash account.`);
    }
  }
};
