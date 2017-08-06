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
		var facts = {
			0: `Kim Jong-un's name is "Jong-un" \nHis last name is "Kim" \nIf he were in America is would be written as "Jong-un Kim"`,
			1: `Korean has more vowels than consonants.\n14 consonants, 21 vowels.`,
			2: `Korean follows a subject-object-verb format when talking.\n"I love you" would be said like "I you love"`,
			3: `In Korean, both 아니요 and 아니 mean no, but the first is a more polite way of saying it.`,
			4: `요 is called the 'politeness particle', and is appended to the end of words and phrases to make them more polite.`,
			5: `세요 means please in Korean.`,
		}
		var random = Math.floor(Math.random() * (Object.keys(facts).length));
		msg.say(`**Fun fact ${random+1} of ${Object.keys(facts).length}**:\n${facts[random]}`);
	}
};