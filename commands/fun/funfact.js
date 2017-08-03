const { Command } = require('discord.js-commando');
const index = require('../../index.js');

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

	async run(msg) { //Returns a random fun fact from a pre-determined object, curated by Lex.
        if(await index.canInkSpeak(msg.channel.id,msg.guild.id) == false) {msg.react('❌'); return;} //Channel ban check
		
		var facts = {
			0: `Kim Jong-un's name is "Jong-un" \nHis last name is "Kim" \nIf he were in America is would be written as "Jong-un Kim"`,
			1: `Korean has more vowels than consonants.\n14 consonants, 21 vowels.`,
			2: `Korean follows a subject-object-verb format when talking.\n"I love you" would be said like "I you love"`,
		}
		var random = Math.floor(Math.random() * (Object.keys(facts).length));
		msg.say(`**Fun fact ${random+1} of ${Object.keys(facts).length}**:\n${facts[random]}`);
	}
};