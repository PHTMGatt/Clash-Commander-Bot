const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check Clash Commander status"),

  async execute(interaction) {
    await interaction.reply("⚡ Clash Commander online.");
  },
};
