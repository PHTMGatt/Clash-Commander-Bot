const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whoami")
    .setDescription("Show bot identity and permissions"),

  async execute(interaction) {
    const me = interaction.guild.members.me;
    const perms = new PermissionsBitField(me.permissions).toArray().join(", ");

    await interaction.reply({
      embeds: [{
        title: "🤖 Clash Commander — Identity",
        color: 0x5865f2,
        fields: [
          { name: "Server", value: interaction.guild.name, inline: true },
          { name: "Bot", value: me.user.tag, inline: true },
          { name: "Roles", value: me.roles.cache.map(r => r.name).join(", ") || "None" },
          { name: "Permissions", value: perms.slice(0, 900) || "None" },
        ],
      }],
      ephemeral: true,
    });
  },
};
