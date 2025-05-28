//src\commands\core\'link.js'

const { SlashCommandBuilder } = require('discord.js');
const { validateTag } = require('../../utils/validateTag');
const { getPlayerData } = require('../../features/linking/handleLink');
const { assignTownHallRole } = require('../../features/linking/assignTownHallRole');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Link your Clash of Clans player tag to your Discord account.')
    .addStringOption(option =>
      option.setName('tag')
        .setDescription('Your Clash of Clans player tag (e.g., #2ABCDEF)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const inputTag = interaction.options.getString('tag');
    const playerTag = validateTag(inputTag);

    if (!playerTag) {
      return interaction.reply({ content: '❌ Invalid player tag format.', ephemeral: true });
    }

    const player = await getPlayerData(playerTag);
    if (!player) {
      return interaction.reply({ content: '❌ Failed to fetch player data. Double check the tag.', ephemeral: true });
    }

    await User.findOneAndUpdate(
      { discordId: interaction.user.id },
      { discordId: interaction.user.id, playerTag, townHall: player.townHallLevel },
      { upsert: true }
    );

    await assignTownHallRole(interaction.member, player.townHallLevel, interaction.guild);

    return interaction.reply({
      content: `✅ Linked to **${player.name}** (TH${player.townHallLevel})`,
      ephemeral: true
    });
  }
};
