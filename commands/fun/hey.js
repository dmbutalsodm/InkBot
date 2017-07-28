const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hey',
            group: 'fun',
            memberName: 'hey',
            description: 'Literally says hey\n'
        });
    }

	async run(msg) {
		return msg.say(`I'm online!`);
	}
};