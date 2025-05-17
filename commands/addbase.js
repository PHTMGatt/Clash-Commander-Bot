import { SlashCommandBuilder } from 'discord.js';
import { saveBase } from '../utils/baseStorage.js';

export default {
  data: new SlashCommandBuilder()
    .setName('addbase')
    .setDescription('Save a base link by Town Hall level and base type')
    .addStringOption(opt =>
      opt.setName('link').setDescription('Paste base link').setRequired(true))
    .addStringOption(opt =>
      opt.setName('th').setDescription('Town Hall level').setRequired(true))
    .addStringOption(opt =>
      opt.setName('type').setDescription('Base type (box, ring, diamond)').setRequired(true)),

  async execute(interaction) {
    const link = interaction.options.getString('link');
    const th = interaction.options.getString('th');
    const type = interaction.options.getString('type');

    const saved = saveBase(th, type, link);
    if (!saved) {
      return interaction.reply({ content: '❌ Failed to save base.', ephemeral: true });
    }

    await interaction.reply(`✅ Saved base link for **TH${th}** [${type}]:\n${link}`);
  }
};
