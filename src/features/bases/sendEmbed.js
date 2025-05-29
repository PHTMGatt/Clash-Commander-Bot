const { baseChannels, logs } = require('../../config/channels');
const { EmbedBuilder } = require('discord.js');

async function sendBaseEmbed(client, { townHall, baseType, layoutStyle, link, user }) {
  const channelId = baseChannels[baseType] || baseChannels.war; // fallback
  const target = await client.channels.fetch(channelId).catch(() => null);
  if (!target) return false;

  const embed = new EmbedBuilder()
    .setTitle(`${townHall.toUpperCase()} • ${baseType.toUpperCase()} • ${layoutStyle}`)
    .setDescription(`[Click to copy base link](${link})`)
    .setColor(0x00cc99)
    .setFooter({ text: `Shared by ${user.username}` });

  await target.send({ embeds: [embed] });

  // Optional log channel
  const logChannel = await client.channels.fetch(logs.botLogs).catch(() => null);
  if (logChannel) {
    await logChannel.send(`📦 ${user.username} sent a ${townHall} ${baseType} base: ${layoutStyle}`);
  }

  return true;
}

module.exports = { sendBaseEmbed };
