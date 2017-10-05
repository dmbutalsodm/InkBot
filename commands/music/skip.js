const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'skip',
			aliases: ['next'],
			group: 'music',
			memberName: 'skip',
			description: 'Skips the currently playing song.',
			details: 'Skips the currently playing song.',
			examples: ['Yui skip'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
			},
		});
	} 
 
	async run(msg) { 
        if(!msg.guild.me.voiceChannel) return msg.say("❌ | I cannot skip, because there is nothing playing!");
        if(msg.member.voiceChannel != msg.guild.me.voiceChannel) return msg.say("❌ | You cannot skip, because you are not in my voice channel!");
        if(!msg.guild.me.voiceChannel.nowPlaying) return msg.say("❌ | I cannot skip, because there is nothing playing!");


        msg.member.voiceChannel.textChannel = msg;
        msg.say("✅ | Skipping this song...");
        if(this.client.voiceConnections.get(msg.guild.id).dispatcher) return this.client.voiceConnections.get(msg.guild.id).dispatcher.end("skip")
        msg.guild.me.voiceChannel.leave();
        msg.say("❌ | There was an error, please try again.");
    }
};