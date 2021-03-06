const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dm',
			group: 'owner',
			memberName: 'dm',
			description: 'Sends a message to the user you mention. Owner only.',
			details: 'Sends a message to the user you mention. Owner only.',
			format: '<member> <message>',
			examples: ['1dm Lex Hello!'],
			guildOnly: true,
			args: [
					{
						key: 'user',
						prompt: 'Which user do you want to send the DM to?',
						type: 'user'
					},
					{
						key: 'content',
						prompt: 'What would you like the content of the message to be?',
						type: 'string'
					}
				]
		});    
	}

	async run(msg, args) { //DMs the mentioned user the written content.
		const {user, content} = args;
		if(!this.client.isOwner(msg.author.id)) return msg.say(`This command is only for Lex and dm!`);
			msg.delete();
			user.send(content);
	}
};