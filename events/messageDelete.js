module.exports = class {
  constructor(client) {
    this.client - client;
  }

  async run(message) {
    const settings = client.settings.get(message.guild.id);
    const Deletion = new RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Message Deletion\n**Message Author:** ${message.author.username}#${message.author.discriminator}\n**Message Content:** ${message}`);
    if (settings.extensiveLogging !== 'true') return;
    message.guild.channels.find('name', settings.modLogChannel).send({ embed: Deletion });
  }
};