const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dm',
			group: 'owner',
			memberName: 'dm',
			description: 'Sends a message to the user you mention.',
			examples: ['dm @User Hi there!'],
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
		if(msg.author.id == `147604925612818432`){
			msg.delete();
			user.send(content);
		} else {msg.say(`Excuse me who do you think you are`);}
	}
};