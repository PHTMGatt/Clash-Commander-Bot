import { SlashCommandBuilder } from 'discord.js';
import { getClanMembers } from '../utils/clashAPI.js';

export default {
  data: new SlashCommandBuilder()
    .setName('clanmembers')
    .setDescription('Get a list of clan members')
    .addStringOption(opt =>
      opt.setName('tag').setDescription('Clan tag').setRequired(true)),

  async execute(interaction) {
    const tag = interaction.options.getString('tag').replace('#', '').toUpperCase();
    const members = await getClanMembers(tag);
    if (!Array.isArray(members)) {
      return interaction.reply({ content: '❌ Error fetching clan members.', ephemeral: true });
    }

    const list = members.map(m => `• ${m.name} (${m.tag}) - TH${m.th || '?'}`).join('\n');
    await interaction.reply({ content: `🛡️ **Clan Members:**\n${list}` });
  }
};
