const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../data/bases/bases.json');

function saveBase(th, type, link) {
    let all = [];
    if (fs.existsSync(file)) {
        all = JSON.parse(fs.readFileSync(file));
    }
    const id = all.length + 1;
    all.push({ id, th, type, link, timestamp: Date.now() });
    fs.writeFileSync(file, JSON.stringify(all, null, 2));
    return id;
}

module.exports = { saveBase };
