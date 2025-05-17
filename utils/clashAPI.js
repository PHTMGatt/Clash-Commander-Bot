const fetch = require('node-fetch');

async function getPlayerData(tag) {
    const res = await fetch(`https://api.clashofclans.com/v1/players/%23${tag}`, {
        headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` }
    });
    return res.json();
}

module.exports = { getPlayerData };
