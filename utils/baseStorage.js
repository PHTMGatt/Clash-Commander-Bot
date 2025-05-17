import fs from 'fs';
import path from 'path';

const file = path.resolve('./data/bases.json');

export function saveBase(th, type, link) {
  let data = {};
  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file));
  }

  if (!data[th]) data[th] = {};
  if (!data[th][type]) data[th][type] = [];

  data[th][type].push(link);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  return true;
}
