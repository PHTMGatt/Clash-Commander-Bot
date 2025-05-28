//src\commands\clan\'stats.js'

const { SlashCommandBuilder } = require('discord.js');
const { getClanStats } = require('../../features/clan/getClanStats');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Get your clan’s general stats.'),

  async execute(interaction) {
    const stats = await getClanStats();

    if (!stats) {
      return interaction.reply({ content: '❌ Failed to fetch clan stats.', ephemeral: true });
    }

    return interaction.reply({
      content: `🏰 **Clan Stats**\nName: ${stats.name}\nMembers: ${stats.members}/50\nWars Won: ${stats.warWins}`,
      ephemeral: true
    });
  }
};
