const { Command } = require('discord.js-commando');
const index = require('../../index.js');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'misc',
			memberName: 'invite',
			description: 'Gives an invite link to invite Ink to your server.',
			examples: ['invite']
		});
	}

	async run(msg) { 	
		msg.say(`Invite me to your server by clicking this link:\n<https://discordapp.com/oauth2/authorize?client_id=328716679171276800&scope=bot&permissions=2080374975>`);
	}
};