const { Command }      = require('discord.js-commando');
const secure           = require('../../secure.json')
const YouTube          = require('youtube-node');
const youtube          = new YouTube();
youtube.setKey(secure.apiTokens.youtube);
const ytdl             = require('ytdl-core');
const queue            = require('../../utils/musicQueue.js');

function inactivityDetectionFn(interval, msg) {
	if(!msg.guild.me.voiceChannel) return clearInterval(interval);
	if(msg.guild.me.voiceChannel.members.filter(member => !member.user.bot && !member.deaf).size < 1 || msg.guild.me.mute) {
		clearInterval(interval);
		msg.guild.voiceConnection.dispatcher.end("inactivityormuted");
	}
}


module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: ['playyt'],
			group: 'music',
			memberName: 'play',
			description: 'Plays the song you search for in the voice channel you are in.',
			details: 'Plays the song you search for in the voice channel you are in.',
			examples: ['Yui play'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
			},
			args: [
				{
					key: "query",
					prompt: "What song would you like to play?",
					type: 'string',
					parse: str => str.toLowerCase()
				}
			]
		});
	}
	async run(msg, args) { 
		const { query } = args;
		if(!msg.guild.me.hasPermission("CONNECT"))                             return msg.say("❌ | I don't have permission to join voice on this server.");
		if(!msg.guild.me.hasPermission("SPEAK"))                               return msg.say("❌ | I don't have permission to speak in voice on this server.");
		if(!msg.member.voiceChannel)                                           return msg.say("⚠ | You're not in a voice channel.");		
		if( msg.member.voiceChannel && !msg.member.voiceChannel.joinable)      return msg.say("❌ | I don't have permission to join your voice channel.");
		if( msg.member.voiceChannel && !msg.member.voiceChannel.speakable)     return msg.say("❌ | I don't have permission to speak in your voice channel.");
		

		youtube.search(query, 1, {type: "video"}, async (e, r) => {
			if(!r.items[0]) return msg.say("❌ | I didn't find a video for that search.");
			if(!msg.guild.me.voiceChannel) {
				return this.startStream(msg, {title: r.items[0].snippet.title, id: r.items[0].id.videoId});
			}
			let guildQueue = await queue.get(msg);
			if(!this.client.voiceConnections.get(msg.guild.id)) {
				if(guildQueue.length > 0) {
					await queue.add(msg, {title: r.items[0].snippet.title, id: r.items[0].id.videoId})
					msg.say(`✅ | **${r.items[0].snippet.title}** has been added to the queue! Resuming queue.`);
					return this.startStream(msg, await queue.nextSong(msg));
				}
				return this.startStream(msg, {title: r.items[0].snippet.title, id: r.items[0].id.videoId});
			}
			if(msg.guild.me.voiceChannel) {
				msg.guild.me.voiceChannel.textChannel = msg;
				queue.add(msg, {title: r.items[0].snippet.title, id: r.items[0].id.videoId});
				return msg.guild.me.voiceChannel.textChannel.say(`✅ | **${r.items[0].snippet.title}** has been added to the queue!`);
			}
		})
	}
	
	async startStream(msg, song) {
		let inAC = setInterval(function() {inactivityDetectionFn(this, msg)}, 10000);
		let stream = ytdl(`https://www.youtube.com/watch?v=${song.id}`, {quality: "highest", filter : 'audioonly'});
		msg.member.voiceChannel.textChannel = msg;
		msg.member.voiceChannel.textChannel.say(`🎵 | Now playing: **${song.title}**`);
		msg.member.voiceChannel.nowPlaying = song;
		msg.member.voiceChannel.join().then((connection) => {
			let dispatcher = connection.playStream(stream);
			dispatcher.on('end', async (reason) => {
				clearInterval(inAC);
				if(reason == "inactivityormuted") {
					msg.say("⚠ | I have left the channel due to inactivity, but the queue has been saved. Use `Yui music resume` to resume.")  
					delete connection.channel.textChannel;
					return connection.disconnect();
				}  
				let nextSong = await queue.nextSong(msg)
				if(!nextSong) {
					connection.channel.textChannel.say("ℹ | There are no more songs in the queue, disconnecting.");
					delete connection.channel.textChannel;
					return connection.disconnect();
				}
				return this.continueStream(msg, nextSong, connection);
			});
		})
	}

	async continueStream(msg, song, connection) {
		let inAC = setInterval(function() {inactivityDetectionFn(this, msg)}, 10000);
		let stream = ytdl(`https://www.youtube.com/watch?v=${song.id}`, {quality: "highest", filter : 'audioonly'});
		msg.guild.voiceConnection.voiceChannel.textChannel.say(`🎵 | Now playing: **${song.title}**`);
		msg.guild.voiceConnection.voiceChannel.nowPlaying = song;
		let dispatcher = connection.playStream(stream);
		dispatcher.on('end', async (reason) => {
			clearInterval(inAC);
			if(reason == "inactivityormuted") {
				msg.say("⚠ | I have left the channel due to inactivity, but the queue has been saved. Use `Yui resume` to resume.")  
				delete connection.channel.textChannel;
				return connection.disconnect();
				
			}          
			let nextSong = await queue.nextSong(msg)
			if(!nextSong) {
				connection.channel.textChannel.say("ℹ | There are no more songs in the queue, disconnecting.");
				delete connection.channel.textChannel;
				return connection.disconnect();
			}
			return this.continueStream(msg, nextSong, connection);
		});
	}
};