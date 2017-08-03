const { Command } = require('discord.js-commando');
const index = require('../../index.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hey',
            group: 'fun',
            memberName: 'hey',
            description: 'See if Ink is online.'
        });
    }

	async run(msg) { //Returns a random greeting from a pre-determined object.
        if(await index.canInkSpeak(msg.channel.id,msg.guild.id) == false) {msg.react('❌'); return;} //Channel ban check

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
		} 
        var random = Math.floor(Math.random() * (Object.keys(greetings).length));
        msg.say(greetings[random]);
	}
};