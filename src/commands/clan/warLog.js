//src\commands\clan\'warLog.js'

const { SlashCommandBuilder } = require('discord.js');
const { getWarLog } = require('../../features/clan/getWarLog');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warlog')
    .setDescription('Get a summary of recent clan wars.'),

  async execute(interaction) {
    const wars = await getWarLog();

    if (!wars.length) {
      return interaction.reply({ content: '⚠️ No recent war logs found.', ephemeral: true });
    }

    const summary = wars.slice(0, 5).map((w, i) =>
      `#${i + 1}: vs **${w.opponent}** — ${w.result} (${w.ourStars}-${w.theirStars})`
    ).join('\n');

    return interaction.reply({
      content: `⚔️ **Recent Wars**\n${summary}`,
      ephemeral: true
    });
  }
};
