const { SlashCommandBuilder } = require('discord.js');
const { getPlayerData } = require('../utils/clashAPI');
const { saveLinkedUser } = require('../utils/storage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link a Clash player to a Discord user')
        .addUserOption(option =>
            option.setName('user').setDescription('Discord user').setRequired(true))
        .addStringOption(option =>
            option.setName('tag').setDescription('Clash player tag (#ABC123)').setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const tag = interaction.options.getString('tag').replace('#', '').toUpperCase();

        const playerData = await getPlayerData(tag);
        if (!playerData.name) {
            return interaction.reply({ content: '❌ Failed to fetch player.', ephemeral: true });
        }

        await saveLinkedUser(user.id, tag, playerData);

        await interaction.reply({
            content: `✅ Linked **${playerData.name}** (TH${playerData.townHallLevel}) to <@${user.id}>.`,
        });
    },
};
