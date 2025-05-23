import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import express from './keepAlive.js';
import { Client, GatewayIntentBits, Collection } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
}

client.once('ready', () => {
  console.log(`🤖 Bot ready as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: '❌ There was an error.', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
