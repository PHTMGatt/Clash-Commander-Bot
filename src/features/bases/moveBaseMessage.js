//src\features\bases\'moveBaseMessage.js'

const { detectBaseType } = require('./detectBaseType');
const Base = require('../../models/Base');
const channels = require('../../config/channels');

async function moveBaseMessage(message, client) {
  const { type, style, townHall } = detectBaseType(message.content);
  if (!type || !townHall) return;

  const targetChannelId = channels.baseChannels[type];
  const targetChannel = client.channels.cache.get(targetChannelId);
  if (!targetChannel) return;

  const embed = {
    title: `${townHall} ${type.toUpperCase()} Base`,
    description: `Style: **${style}**\n[View Base Link](${message.content.match(/https?:\/\/\S+/)?.[0]})`,
    footer: { text: `Uploaded by ${message.author.tag}` },
    timestamp: new Date()
  };

  const sent = await targetChannel.send({ embeds: [embed] });

  await Base.create({
    uploaderId: message.author.id,
    link: message.content.match(/https?:\/\/\S+/)?.[0],
    townHall: parseInt(townHall.replace('TH', '')),
    type,
    style,
    messageId: sent.id
  });

  await message.delete().catch(console.error);
}

module.exports = { moveBaseMessage };
