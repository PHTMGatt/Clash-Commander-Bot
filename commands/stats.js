import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getPlayerData } from '../utils/clashAPI.js';

export default {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Show Clash of Clans player stats')
    .addStringOption(opt =>
      opt.setName('tag').setDescription('Clash player tag').setRequired(true)),

  async execute(interaction) {
    const tag = interaction.options.getString('tag').replace('#', '').toUpperCase();
    const data = await getPlayerData(tag);
    if (data.reason) {
      return interaction.reply({ content: '❌ API error or tag invalid.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(`${data.name} (${data.tag})`)
      .addFields(
        { name: 'Town Hall', value: `${data.townHallLevel}`, inline: true },
        { name: 'Trophies', value: `${data.trophies}`, inline: true },
        { name: 'War Stars', value: `${data.warStars}`, inline: true },
        { name: 'Clan', value: data.clan?.name || 'No Clan', inline: true }
      )
      .setColor('Yellow');

    await interaction.reply({ embeds: [embed] });
  }
};
