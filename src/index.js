require("dotenv").config();
const client = require("./client");
const fs = require("fs");
const path = require("path");

const commands = new Map();
const commandsPath = path.join(__dirname, "commands");

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.data && command.execute) {
      commands.set(command.data.name, command);
    }
  }
}

client.once("ready", () => {
  console.log(`Clash Commander online as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    if (interaction.replied || interaction.deferred) {
      interaction.followUp({ content: "Error executing command.", ephemeral: true });
    } else {
      interaction.reply({ content: "Error executing command.", ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
