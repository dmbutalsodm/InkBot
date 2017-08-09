const { Command } = require('discord.js-commando');
const index = require('../../index.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hey',
            group: 'fun',
            memberName: 'hey',
            description: 'See if Ink is online.',
            details: 'See if Ink is online.',
            examples: ['1hey']
        });
    }

	async run(msg) { //Returns a random greeting from a pre-determined object.
        var greetings = { 
			0: 'Hello!',
            1: 'Hi!',
            2: 'Hey there!',
            3: 'I\'m here!',
            4: 'Pong!',
            5: 'Hey!',
            6: '안녕하세요!',
            7: 'Yes?',
            8: 'Ready to work!',
            9: `hi person hi hi`,
            10: `Hello jello!`,
            11: "어떻게 지내세요?",
            12: "만나서 반갑습니다",
            13: "안녕하십니까",
            14: "좋은 아침입니다",
            15: "무슨 일이야?",
            16: "모해?",
            17: "야!",
            18: "오랜만이에요.",
		} 
        var random = Math.floor(Math.random() * (Object.keys(greetings).length));
        msg.say(greetings[random]);
    	}
};