const { Command } = require('discord.js-commando');
const index = require('../../index.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'starboard',
            group: 'channel',
            memberName: 'starboard',
            description: 'Sets the selected channel as the starboard for the server.',
            details: 'Sets the selected channel as the starboard for the server. Running the command in a new channel will overwrite the previous one, and running the command in the existing channel will remove it.\n Adding a number argument will set the minimum percentage of your guild needed to send a message to the board.',
            examples: ['1starboard', '1starboard 15'],
            guildOnly: true,
            args: [
                {
                    key: 'percentage',
					prompt: 'the user percentage for a starboard post to happen',
					type: 'integer',
                    default: '',
                    format: '[percentage]'
                }
            ]
        });
    }

	async run(msg, args) { 
        if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.say("You don't have permission to manage messages!");
        const { percentage } = args;
        var provider = this.client.provider;
        if(percentage) {
            if(percentage <= 0 || percentage > 100) return msg.say("That's not a valid percentage, please choose between 0 and 100, not including 0.");
            provider.set(msg.guild, 'starboardPercentage', percentage);
            return msg.say(`Starboard minimum percentage has been set to ${percentage}%.`);
        }
        if(provider.get(msg.guild, 'starboardChannel', 'failedToDefine') == msg.channel.id) {
            provider.remove(msg.guild, 'starboardChannel');
            return msg.say('There is no longer a starboard on this server.');
        }
        provider.set(msg.guild, 'starboardChannel', msg.channel.id);
        msg.say("Done! This is now where new stars will be logged.");

    }
};