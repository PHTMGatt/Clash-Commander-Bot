const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/linkedAccounts.json');

function saveLinkedUser(discordId, tag, data) {
    let existing = {};
    if (fs.existsSync(filePath)) {
        existing = JSON.parse(fs.readFileSync(filePath));
    }
    existing[discordId] = { tag, name: data.name, townHall: data.townHallLevel };
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
}

module.exports = { saveLinkedUser };
