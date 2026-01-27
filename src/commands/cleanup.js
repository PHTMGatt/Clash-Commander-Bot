const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cleanup")
    .setDescription("Delete recent bot messages in this channel")
    .addIntegerOption(o =>
      o.setName("count").setDescription("How many messages").setMinValue(1).setMaxValue(50)
    ),

  async execute(interaction) {
    const count = interaction.options.getInteger("count") ?? 20;
    const messages = await interaction.channel.messages.fetch({ limit: 100 });
    const botMsgs = messages.filter(m => m.author.bot).first(count);

    await interaction.channel.bulkDelete(botMsgs, true);
    await interaction.reply({ content: `🧹 Deleted ${botMsgs.length} bot messages.`, ephemeral: true });
  },
};
