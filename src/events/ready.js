//src\events\'ready.js'

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
    client.user.setActivity('/link | Clash Commander', { type: 'LISTENING' });
  }
};
