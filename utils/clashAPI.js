import fetch from 'node-fetch';

function encodeTag(tag) {
  return tag.replace('#', '%23');
}

export async function getPlayerData(tag) {
  const res = await fetch(`https://api.clashofclans.com/v1/players/${encodeTag(tag)}`, {
    headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` }
  });
  return res.json();
}

export async function getClanMembers(clanTag) {
  const res = await fetch(`https://api.clashofclans.com/v1/clans/${encodeTag(clanTag)}/members`, {
    headers: { Authorization: `Bearer ${process.env.CLASH_API_TOKEN}` }
  });
  const data = await res.json();
  return data.items?.map(member => ({
    name: member.name,
    tag: member.tag,
    th: member.townHallLevel
  })) || [];
}
