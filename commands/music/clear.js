const { Command } = require('discord.js-commando');
const queue       = require('../../utils/musicQueue.js');

module.exports = class ClearCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clear',
			aliases: ['destroy'],
			group: 'music',
			memberName: 'clear',
			description: 'Clears the current queue.',
			details: 'Clears the current queue.',
			examples: ['Yui clear'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
			},
		});
	}

	async run(msg) { 
        if(!msg.guild.me.voiceChannel) return msg.say("❌ | I cannot clear the queue, because there is nothing playing!");
        if(msg.member.voiceChannel != msg.guild.me.voiceChannel) return msg.say("❌ | You cannot clear the queue, because you are not in my voice channel!");
        if(!msg.guild.me.voiceChannel.nowPlaying) return msg.say("❌ | I cannot clear the queue, because there is nothing playing!");

        let guildQueue = await queue.get(msg);
        if(guildQueue.length == 0) return msg.say("❌ | There is nothing in the queue to clear!");
        msg.member.voiceChannel.textChannel = msg;
        queue.destroy(msg);
        msg.say("✅ | The queue has been cleared.");
    }
};