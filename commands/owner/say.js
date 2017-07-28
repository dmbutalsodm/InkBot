const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			group: 'owner',
			memberName: 'say',
			description: 'Says what\'s provided.',
			examples: ['say Hi there!'],
			args:[
				{
					key: `text`,
					prompt: `What text would you like to say?`,
					type:`string`
				}
			]
		});
	}

	async run(msg,args) {
		const { text } = args;
		msg.delete();
		return msg.say(`\u180E${text}`);
	}
};