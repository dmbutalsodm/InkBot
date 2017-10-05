const { Command } = require('discord.js-commando');
const queue       = require('../../utils/musicQueue.js');

module.exports = class ResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'resume',
			group: 'music',
			memberName: 'resume',
			description: 'Resumes the queue from inactivity.',
			details: 'If playback stopped due to inactivity, use this command to resume it.',
			examples: ['Yui resume'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
			},
		});
	}

	async run(msg) { 
        if(!msg.guild.me.hasPermission("CONNECT"))                             return msg.say("❌ | I don't have permission to join voice on this server.");
		if(!msg.guild.me.hasPermission("SPEAK"))                               return msg.say("❌ | I don't have permission to speak in voice on this server.");
        if(!msg.member.voiceChannel)                                           return msg.say("⚠ | You're not in a voice channel.");        
        if( msg.member.voiceChannel && !msg.member.voiceChannel.joinable)      return msg.say("❌ | I don't have permission to join your voice channel.");
		if( msg.member.voiceChannel && !msg.member.voiceChannel.speakable)     return msg.say("❌ | I don't have permission to speak in your voice channel.");
        
        let guildQueue = await queue.get(msg);
        if(guildQueue.length == 0) {
            msg.member.voiceChannel.join().then(connection => connection.disconnect());
            return msg.say("❌ | There is nothing in the queue to resume!");
        }
        msg.say("✅ | Resuming playback");
        this.group.commands.get('play').startStream(msg, await queue.nextSong(msg));
    }  
};