// src/'index.js'

require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const config = require('./src/config/env');

// ✅ Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// 📁 Load slash commands
const commandsPath = path.join(__dirname, 'src/commands');
for (const sub of fs.readdirSync(commandsPath)) {
  const subPath = path.join(commandsPath, sub);
  for (const file of fs.readdirSync(subPath).filter(f => f.endsWith('.js'))) {
    const command = require(path.join(subPath, file));
    client.commands.set(command.data.name, command);
  }
}

// 📁 Load events
const eventsPath = path.join(__dirname, 'src/events');
for (const file of fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'))) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// 🔁 Load cron jobs
const { scheduleRaidReminders } = require('./src/jobs/scheduleRaidReminders');
const { scheduleWarReminders } = require('./src/jobs/scheduleWarReminders');
const { scheduleLegendsCheck } = require('./src/jobs/scheduleLegendsCheck');

scheduleRaidReminders(client);
scheduleWarReminders(client);
scheduleLegendsCheck(client);

// 🌐 Connect to MongoDB and login bot
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🧠 Connected to MongoDB');
  client.login(config.discordToken);
}).catch(err => {
  console.error('MongoDB Error:', err);
});

// 🚀 Slash command registration (Guild Only — fast updates)
client.once('ready', async () => {
  const commands = client.commands.map(cmd => cmd.data.toJSON());
  const rest = new REST({ version: '10' }).setToken(config.discordToken);

  try {
    console.log('📡 Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, '1179146733763186688'),
      { body: commands }
    );
    console.log('✅ Slash commands registered.');
  } catch (err) {
    console.error('❌ Failed to register commands:', err);
  }
});
