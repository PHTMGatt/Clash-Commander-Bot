const { SlashCommandBuilder } = require("discord.js");

const startTime = Date.now();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Show Clash Commander system status"),

  async execute(interaction) {
    const uptimeMs = Date.now() - startTime;
    const uptimeSec = Math.floor(uptimeMs / 1000);

    await interaction.reply({
      embeds: [
        {
          title: "🛠 Clash Commander — Status",
          color: 0x00bcd4,
          fields: [
            { name: "Status", value: "🟢 Online", inline: true },
            { name: "Uptime", value: `${uptimeSec}s`, inline: true },
            { name: "Node", value: process.version, inline: true },
            { name: "Environment", value: "Production", inline: true },
          ],
          footer: { text: "DevOps / Ops Bot" },
        },
      ],
    });
  },
};
