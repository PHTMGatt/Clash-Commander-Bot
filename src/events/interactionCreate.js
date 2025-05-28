//src\events\'interactionCreate.js'

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return interaction.reply({ content: '❌ Command not found.', ephemeral: true });
    }

    try {
      await command.execute(interaction, client);
    } catch (err) {
      console.error('⚠️ Error executing command:', err);
      return interaction.reply({
        content: '❌ There was an error while executing this command.',
        ephemeral: true
      });
    }
  }
};
