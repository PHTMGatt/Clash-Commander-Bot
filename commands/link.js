import { SlashCommandBuilder } from 'discord.js';
import { getPlayerData } from '../utils/clashAPI.js';
import { saveLinkedUser } from '../utils/storage.js';

export default {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Link a Clash player to a Discord user')
    .addUserOption(opt =>
      opt.setName('user').setDescription('Discord user').setRequired(true))
    .addStringOption(opt =>
      opt.setName('tag').setDescription('Clash player tag').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const tag = interaction.options.getString('tag').replace('#', '').toUpperCase();
    const data = await getPlayerData(tag);
    if (data.reason) {
      return interaction.reply({ content: '❌ API error or invalid tag.', ephemeral: true });
    }
    await saveLinkedUser(user.id, tag, data);
    await interaction.reply({ content: `✅ Linked **${data.name}** (TH${data.townHallLevel}) to <@${user.id}>.` });
  }
};
