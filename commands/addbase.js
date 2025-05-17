const { SlashCommandBuilder } = require('discord.js');
const { saveBase } = require('../utils/baseStorage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addbase')
        .setDescription('Add a base layout')
        .addStringOption(opt =>
            opt.setName('townhall').setDescription('Town Hall level').setRequired(true))
        .addStringOption(opt =>
            opt.setName('type').setDescription('Base type (diamond, box, ring, etc)').setRequired(true))
        .addStringOption(opt =>
            opt.setName('link').setDescription('Base link').setRequired(true)),

    async execute(interaction) {
        const townhall = interaction.options.getString('townhall');
        const type = interaction.options.getString('type');
        const link = interaction.options.getString('link');

        const id = await saveBase(townhall, type, link);

        await interaction.reply({
            content: `✅ Base added (TH${townhall}, ${type}) [ID: ${id}]`,
        });
    }
};
