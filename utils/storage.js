import fs from 'fs';
import path from 'path';

const file = path.resolve('./data/linkedAccounts.json');

export function saveLinkedUser(discordId, tag, data) {
  let existing = {};
  if (fs.existsSync(file)) {
    existing = JSON.parse(fs.readFileSync(file));
  }
  existing[discordId] = { tag, name: data.name, townHall: data.townHallLevel };
  fs.writeFileSync(file, JSON.stringify(existing, null, 2));
}
