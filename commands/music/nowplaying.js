const { Command } = require('discord.js-commando');

module.exports = class NowPlayingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'nowplaying',
			aliases: ['currentsong', 'np', 'song'],
			group: 'music',
			memberName: 'nowplaying',
			description: 'Displays the currently playing song.',
			details: 'Displays the currently playing song.',
			examples: ['Yui nowplaying'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
			},
		});
	}

	async run(msg) { 
        let connection = this.client.voiceConnections.get(msg.guild.id)
        if(!connection) return msg.say("⚠ | There is nothing currently playing.");
        return connection.channel.nowPlaying ? msg.say(`🎵 | Now playing: **${connection.channel.nowPlaying.title}**`) : msg.say("⚠ | There is nothing currently playing.");
    }
};