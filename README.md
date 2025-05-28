# 🏆 Clash Commander Bot

<p align="center">
  <img src="src/assets/clan-logo.png" width="250" alt="Clan Logo"/>
</p>

A powerful, modular Discord bot for **Clash of Clans** clans.

> Automate Town Hall roles, link players, sort base links, and stay ready for war — clean and efficient.

---

## ✨ Key Features

- 🔗 `/link` — Link Discord users to Clash accounts via the official API
- 🏰 Auto-assign TH roles (TH13–TH17+)
- 🧱 `/addbase` — Store and search base links by TH & style
- ⚔️ War, Raid, and Legend attack reminders
- 📊 MongoDB storage for users and bases

---

## ⚙️ Quick Setup

```bash
git clone https://github.com/YOURNAME/clash-commander-bot
cd clash-commander-bot
npm install
```

Create a `.env` file:

```env
DISCORD_BOT_TOKEN=your_token
COC_API_TOKEN=your_clash_token
CLAN_TAG=#YourClan
MONGODB_URI=your_mongo_uri
PORT=3000
```

Run it:

```bash
npm run start
```

---

## 🗂 Commands

| Command     | Description                        |
|-------------|------------------------------------|
| `/link`     | Link your Clash player tag         |
| `/search`   | Find base links by TH & type       |
| `/mybases`  | View your uploaded bases           |
| `/warlog`   | View recent clan war outcomes      |

---

## 📁 Structure Overview

```
src/
├── commands/
├── features/
├── jobs/
├── models/
├── utils/
├── config/
├── events/
└── web/
```

---

## 🔐 Requirements

- Node.js v18+
- Discord bot token
- Clash of Clans API token
- MongoDB URI (Atlas or self-hosted)

---

> ⚙️ Built with `discord.js` and the Clash of Clans public API.