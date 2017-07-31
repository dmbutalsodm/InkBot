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
		var facts = {
			0: `Kim Jong-un's name is "Jong-un" \nHis last name is "Kim" \nIf he were in America is would be written as "Jong-un Kim"`,
			1: `Korean has more vowels than consonants.\n14 consonants, 21 vowels.`
		}
		var random = Math.floor(Math.random() * (Object.keys(facts).length));
		msg.say(`**Fun fact ${random+1} of ${Object.keys(facts).length}**:\n${facts[random]}`);
	}
};