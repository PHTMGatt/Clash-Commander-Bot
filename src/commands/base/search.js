//src\commands\base\'search.js'

const { SlashCommandBuilder } = require('discord.js');
const Base = require('../../models/Base');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search for base links by Town Hall and type.')
    .addIntegerOption(option =>
      option.setName('townhall')
        .setDescription('Town Hall level')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Base type (e.g., war, cwl, legend)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const th = interaction.options.getInteger('townhall');
    const type = interaction.options.getString('type');

    const results = await Base.find({ townHall: th, type });

    if (!results.length) {
      return interaction.reply({ content: '❌ No bases found for that criteria.', ephemeral: true });
    }

    const formatted = results.map(b => `• [${b.style}](${b.link}) - Uploaded by <@${b.uploaderId}>`).join('\n');

    return interaction.reply({
      content: `🛡️ **${results.length} base(s) found** for TH${th} ${type}:\n${formatted}`,
      ephemeral: true
    });
  }
};
