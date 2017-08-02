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

	async run(msg,args) { //Echos the written content.
		const { text } = args;
		if(msg.author.id == `147604925612818432`){
			msg.delete();
			return msg.say(`\u180E${text}`);
		} else {msg.say(`Excuse me who do you think you are`);}
	}
};