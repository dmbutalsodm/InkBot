const { Command } = require('discord.js-commando');

module.exports = class EightBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			group: 'fun',
			memberName: '8ball',
			description: 'Ask the magic 8-ball a question.',
			details: 'Ask the magic 8-ball a question.',
            examples: ['8ball Will I ever be happy?'],
            throttling: {
				usages: 3,
				duration: 10
            },
            args: [
                {
                    key: "query",
					prompt: "What do you want to ask the magic 8-ball?",
                    type: 'string',
                }
            ]
		});
	}

	async run(msg) { //Returns a random fun fact from a pre-determined object, curated by Lex.		
		var readings = [
			 "It is certain.",
             "It is decidedly so.",
             "Without a doubt.",
             "Yes, definitely.",
             "You may rely on it.",
             "As I see it, yes.",
             "Most likely.",
             "Outlook seems good.",
             "Yes!",
             "All signs point to yes.", //10 positive
             "Reply hazy, try again.",
             "Ask again later.",
             "Better to not tell you now.",
             "Cannot predict right now.",
             "Concentrate, and then ask again.", //5 Neutral
             "Don't count on it.",
             "My reply is no.",
             "My sources say no.",
             "Outlook not so good.",
             "Very doubtful.",
             "I don't think so.",
             "Doesn't look like it.",
             "I think not.",
             "Sorry, no.",
             "Absolutely not.", //10 negative
        ]
		msg.say("🎱 | Shaking the ball...").then(msg => {
            setTimeout(function () {msg.edit(`🎱 | ${readings[Math.floor(Math.random() * readings.length)]}`)}, 500 + Math.floor(Math.random() * 2000));
        })
        
	}
};