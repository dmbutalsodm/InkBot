const { Command } = require('discord.js-commando');
const queue       = require('../../utils/musicQueue.js');
function shuffle (array) { //Still stolen.
    let i = 0
    let j = 0
    let temp;
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
}

module.exports = class NowPlayingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'shuffle',
			group: 'music',
			memberName: 'shuffle',
			description: 'Shuffles the current queue.',
			details: 'Shuffles the current queue.',
			examples: ['Yui nowplaying'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
			},
		});
	}

	async run(msg) { 
        let guildQueue = await queue.get(msg);
        if(guildQueue.length <= 1) return msg.say("⚠ | There is nothing to shuffle.");
        shuffle(guildQueue);
        queue.update(msg, guildQueue);
        return msg.say("✅ | The queue has been shuffled!");
    }
};