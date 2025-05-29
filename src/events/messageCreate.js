// src/events/'messageCreate.js'

const { baseDumpChannels, logs, baseChannels } = require('../config/channels');
const { parseBaseMessage } = require('../features/bases/parseBase');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (
      message.author.bot ||
      !baseDumpChannels.includes(message.channel.id)
    ) return;

    const parsed = parseBaseMessage(message.content);
    if (!parsed) return;

    const { townHall, baseType, layoutStyle, link } = parsed;
    const thKey = townHall.toLowerCase(); // e.g. "th17"

    // Target correct base channel (fallback to th15)
    const targetChannelId = baseChannels[thKey]?.bases || baseChannels.th15.bases;
    const target = await client.channels.fetch(targetChannelId).catch(() => null);
    if (!target) return;

    // Send the formatted base embed
    const embed = new EmbedBuilder()
      .setTitle(`🧱 ${townHall.toUpperCase()} | ${baseType.toUpperCase()} | ${layoutStyle}`)
      .setDescription(`[Click to copy base link](${link})`)
      .setColor(0xff9900)
      .setFooter({ text: `Shared by ${message.member?.displayName || message.author.username}` });

    await target.send({ embeds: [embed] });
    await message.delete().catch(() => {});

    // Log the action
    const logChannel = await client.channels.fetch(logs.botLogs).catch(() => null);
    if (logChannel) {
      logChannel.send(`✅ Sorted base from ${townHall.toUpperCase()} → <#${targetChannelId}>`);
    }
  }
};
