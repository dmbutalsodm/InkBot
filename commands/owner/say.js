const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			group: 'owner',
			memberName: 'say',
			description: 'Says what\'s provided. Owner only.',
			examples: ['1say Hi there!'],
			format: '<message>',
			args:[
				{
					key: `text`,
					prompt: `What text would you like to say?`,
					type:`string`
				}
			]
		});
	}

	async run(msg,args) { //Echos the written content.
		const { text } = args;
		if(!this.client.isOwner(msg.author.id)) return msg.say(`This command is only for Lex and dm!`);
		msg.delete();
		return msg.say(`\u180E${text}`);
	}
};