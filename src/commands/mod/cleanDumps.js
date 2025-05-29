// src/commands/mod/'cleanDumps.js'

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { baseDumpChannels, baseChannels, logs } = require('../../config/channels');
const { parseBaseMessage } = require('../../features/bases/parseBase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clean-dumps')
    .setDescription('Reformat and move all base links from dump channels')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    await interaction.reply('🔍 Cleaning up old dump messages...');

    let count = 0;

    for (const channelId of baseDumpChannels) {
      const channel = await interaction.client.channels.fetch(channelId).catch(() => null);
      if (!channel) continue;

      const messages = await channel.messages.fetch({ limit: 100 });
      for (const msg of messages.values()) {
        if (msg.author.bot) continue;

        const parsed = parseBaseMessage(msg.content);
        if (!parsed) continue;

        const { townHall, baseType, layoutStyle, link } = parsed;
        const thKey = townHall.toLowerCase();
        const targetId = baseChannels[thKey]?.bases || baseChannels.th15.bases;
        const target = await interaction.client.channels.fetch(targetId).catch(() => null);
        if (!target) continue;

        const embed = new EmbedBuilder()
          .setTitle(`🧱 ${townHall.toUpperCase()} | ${baseType.toUpperCase()} | ${layoutStyle}`)
          .setDescription(`[Click to copy base link](${link})`)
          .setColor(0x33cc99)
          .setFooter({ text: `Originally by ${msg.member?.displayName || msg.author.username}` });

        await target.send({ embeds: [embed] });
        await msg.delete().catch(() => {});
        count++;
      }
    }

    await interaction.editReply(`✅ Reformatted and moved ${count} base messages.`);

    const log = await interaction.client.channels.fetch(logs.botLogs).catch(() => null);
    if (log) {
      await log.send(`🧹 Ran \`/clean-dumps\`: ${count} messages cleaned.`);
    }
  }
};
