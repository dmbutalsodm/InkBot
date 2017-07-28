const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'funfact',
            group: 'fun',
            memberName: 'funfact',
            description: 'Have you heard this fact before?',
            examples: ['funfact']
        });
    }

	async run(msg) {
		return msg.say(`I'm online!`);
	}
};