const Moderation = require('../../base/Moderation.js');

class Hackban extends Moderation {
  constructor(client) {
    super(client, {
      name: 'hackban',
      description: 'Forcebans a user.',
      usage: 'hackban <user id> [reason]',
      category: 'Moderation',
      extended: 'This command bans a user not in the server.',
      aliases: ['forceban'],
      botPerms: ['SEND_MESSAGES', 'BAN_MEMBERS'],
      permLevel: 'Moderator'
    });
  }

  async run(message, args, level) {
    const settings = this.client.settings.get(message.guild.id);
    const channel  = message.guild.channels.exists('name', settings.modLogChannel);
    if (!channel)    throw `${message.author}, I cannot find the \`${settings.modLogChannel}\` channel.`;
    const target   = args[0];
    if (!target)     throw `${message.author} |\`❌\`| Invalid command usage, You must mention someone to use this command.`;
    const modLevel = this.modCheck(message, args[0], level);
    if (typeof modLevel === 'string') return message.reply(modLevel);
    const reason   = args.splice(1, args.length).join(' ');
    try {
      await target.ban({days:0, reason: reason.length < 1 ? 'No reason supplied.': reason});
      await this.buildModLog(this.client, message.guild, 'hb', target, message.author, reason);
      await message.channel.send(`\`${target.user.tag}\` was successfully banned.`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Hackban;