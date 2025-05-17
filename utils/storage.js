const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../data/linkedAccounts.json');

function saveLinkedUser(discordId, tag, data) {
  let existing = {};
  if (fs.existsSync(file)) {
    existing = JSON.parse(fs.readFileSync(file));
  }
  existing[discordId] = { tag, name: data.name, townHall: data.townHallLevel };
  fs.writeFileSync(file, JSON.stringify(existing, null, 2));
}

module.exports = { saveLinkedUser };
