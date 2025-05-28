//src\commands\base\'myBases.js'

const { SlashCommandBuilder } = require('discord.js');
const Base = require('../../models/Base');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mybases')
    .setDescription('View your uploaded base links.'),

  async execute(interaction) {
    const bases = await Base.find({ uploaderId: interaction.user.id });

    if (!bases.length) {
      return interaction.reply({ content: '📭 You haven’t uploaded any bases yet.', ephemeral: true });
    }

    const list = bases.map(b => `• [TH${b.townHall} ${b.type} - ${b.style}](${b.link})`).join('\n');

    return interaction.reply({
      content: `📂 Your Bases:\n${list}`,
      ephemeral: true
    });
  }
};
