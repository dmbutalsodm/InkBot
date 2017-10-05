const { Command } = require('discord.js-commando');
const queue       = require('../../utils/musicQueue.js');

module.exports = class RemoveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'remove',
			group: 'music',
			memberName: 'remove',
			description: 'Removes the selected song number from the queue.',
			details: 'Removes the selected song number from the queue.',
			examples: ['Yui remove 5'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
            },
            args: [
                {
                    key: "song",
					prompt: "What number song would you like to remove?",
                    type: 'integer',
                }
            ],
		});
	}

	async run(msg, args) { 
        const { song } = args;
        if(!msg.guild.me.voiceChannel) return msg.say("❌ | I cannot remove that song, because there is nothing playing!");
        if(msg.member.voiceChannel != msg.guild.me.voiceChannel) return msg.say("❌ | You cannot remove that song, because you are not in my voice channel!");
        if(!msg.guild.me.voiceChannel.nowPlaying) return msg.say("❌ | I cannot remove that song, because there is nothing playing!");
        
        let guildQueue = await queue.get(msg);
        let removedSong = guildQueue.splice(song, 1);
        if(removedSong.length != 1) return msg.say("❌ | I cannot remove that song, because it doesn't exist!");
        msg.member.voiceChannel.textChannel = msg;
        queue.update(msg, guildQueue);
        return msg.member.voiceChannel.textChannel.say(`✅ | **${removedSong[0].title}** has been removed from the queue.`)	
    }
};