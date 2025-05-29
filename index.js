// src\'index.js'

require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const config = require('./src/config/env');

// ✅ Initialize Discord client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// 🧠 Attach command collection to the client
client.commands = new Collection();

// 📁 Load all slash commands from subfolders
const commandsPath = path.join(__dirname, 'src/commands');
for (const sub of fs.readdirSync(commandsPath)) {
  const subPath = path.join(commandsPath, sub);
  for (const file of fs.readdirSync(subPath).filter(f => f.endsWith('.js'))) {
    const command = require(path.join(subPath, file));
    client.commands.set(command.data.name, command);
  }
}

// 📁 Load all event handlers
const eventsPath = path.join(__dirname, 'src/events');
for (const file of fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'))) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// 🔁 Load scheduled jobs (cron tasks)
const { scheduleRaidReminders } = require('./src/jobs/scheduleRaidReminders');
const { scheduleWarReminders } = require('./src/jobs/scheduleWarReminders');
const { scheduleLegendsCheck } = require('./src/jobs/scheduleLegendsCheck');

scheduleRaidReminders(client);
scheduleWarReminders(client);
scheduleLegendsCheck(client);

// 🌐 Connect to MongoDB then login
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🧠 Connected to MongoDB');
  client.login(config.discordToken);
}).catch(err => {
  console.error('MongoDB Error:', err);
});
