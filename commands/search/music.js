/*
THIS COMMAND IS DEPRECIATED AND DOESN'T WORK ANYMORE, IT WAS REPLACED BY THE "MUSIC" COMMAND GROUP.
AAAAAAAA
CAPITAL LETTERS
I DONT WANNA DELETE IT BECAUSE IT TOOK A LOT OF WORK.
*/



const { Command } = require('discord.js-commando');
const secure      = require('../../secure.json')
const YouTube     = require('youtube-node');
const youtube     = new YouTube();
youtube.setKey(secure.apiTokens.youtube);
const ytdl        = require('ytdl-core');
const { stripIndents } = require('common-tags');

//npm install youtube-node ytdl-core ffmpeg-binaries opusscript --save


module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'music',
			group: 'search',
			memberName: 'music',
			description: "This command is depreciated. Use the music command suite now.", //'General command for playing music in a voice channel with Ink.',
			/*details: stripIndents`
			There are several sub-commands available:\n
			\`play\`: Searches for your query and plays a song or adds it to the queue.
			\`skip\`: Skips the currently playing song.
			\`queue\`: Shows the current queue.
			\`clear\`: Clears the queue.
			\`shuffle\`: Shuffles the queue.
			\`remove\`: Removes the number song you indicate from the queue.
			\`resume\`: Resumes the queue if Ink left due to inactivity.
			\`fix\`: If the bot restarts in the middle of a song, this command will begin the queue again, you should almost never have to use this.		
			`, */
			format: '<option> [query]',
			examples: ['Ink music play XO TOUR Llif3', 'Ink music play <https://www.youtube.com/watch?v=9hyCBjrY3eA>','Ink music skip', 'Ink music queue', 'Ink music clear', 'Ink music shuffle', 'Ink music remove 2', 'Ink music resume' ],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
			},
			args: [
				{
					key: "option",
					prompt: "What would you like to do?",
					type: "string",
					default: "help",
					parse: str => str.toLowerCase()
				},
				{
					key: "query",
					prompt: "hello my dear friendo",
					type: 'string',
					default: "",
				}
			]
		});
	}

	async run(msg, args) {

		return msg.say("This command is depreciated. Use the music command suite now.");

		var { query, option } = args;
		if(!msg.guild.me.hasPermission("CONNECT"))                            return msg.say("❌ | I don't have permission to join voice on this server.");
		if(!msg.guild.me.hasPermission("SPEAK"))                              return msg.say("❌ | I don't have permission to speak in voice on this server.");
		if(!msg.member.voiceChannel && option != "queue" && option != "help") return msg.say("⚠ | You're not in a voice channel.");
		if(msg.member.voiceChannel && !msg.member.voiceChannel.joinable)      return msg.say("❌ | I don't have permission to join your voice channel.");
		if(msg.member.voiceChannel && !msg.member.voiceChannel.speakable)     return msg.say("❌ | I don't have permission to speak in your voice channel.");

		switch(option) {
			case "play": {
				let thisQueue = await index.getQueue(msg);
				if(!msg.guild.me.voiceChannel && thisQueue.length == 0) {
					youtube.search(query, 5, (e, r) => {
						if(e) return console.log(e);
						let result = r.items[0];
						if(!result) return msg.say("I didn't find a video.");
						for(let i = 0;i<5;i++) {
							if(result.id.kind == "youtube#video") break;
							result = r.items[i+1];
						}
						if(result.id.kind != "youtube#video") return msg.say("⚠ | I didn't find a video.");
						let stream = ytdl(`https://www.youtube.com/watch?v=${result.id.videoId}`, {quality: "highest", filter : 'audioonly'});
						return this.initializeStream(msg, stream, result.snippet.title);
					});
					return;
				}
				if(!msg.guild.me.voiceChannel && thisQueue.length > 0) {
					let toPush = await index.getQueue(msg);
					let nextStream = toPush[0];
					toPush.splice(0, 1);
					index.updateQueue(msg, toPush);
					let stream = ytdl(`https://www.youtube.com/watch?v=${nextStream.vidID}`, {quality: "highest", filter : 'audioonly'});
					this.initializeStream(msg, stream, nextStream.title);
					youtube.search(query, 5, async (e, r) => {
						if(e) return console.log(e);
						let result = r.items[0];
						for(let i = 0;i<5;i++) {
							if(result.id.kind == "youtube#video") break;
							result = r.items[i+1];
						}
						if(result.id.kind != "youtube#video") return msg.say("I didn't find a video");
						let toSet = await index.getQueue(msg);
						toSet.push({title: result.snippet.title, vidID: result.id.videoId});
						index.updateQueue(msg, toSet);
						return msg.say(`✅ | **${result.snippet.title}** has been added to the queue, resuming queue.`);
					});
					return;
				}
				youtube.search(query, 5, async (e, r) => {
					if(e) return console.log(e);
					let result = r.items[0];
					for(let i = 0;i<5;i++) {
						if(result.id.kind == "youtube#video") break;
						result = r.items[i+1];
					}
					if(result.id.kind != "youtube#video") return msg.say("I didn't find a video");
					let toSet = await index.getQueue(msg);
					toSet.push({title: result.snippet.title, vidID: result.id.videoId});
					index.updateQueue(msg, toSet);
					msg.say(`✅ | **${result.snippet.title}** has been added to the queue!`);
				});
				break;
			}
			case "fix": {
				if(this.client.voice.connections.get(msg.guild.id)) return msg.say("❌ | This command only needs to be run if a bot restart occurs in the middle of a song.");
				let toPush = await index.getQueue(msg);
				if(toPush.length == 0) {
					msg.member.voiceChannel.join().then(connection => {connection.disconnect()});
					return msg.say("⚠ | There is nothing in the queue to resume.");
				}
				let nextStream = toPush[0];
				toPush.splice(0, 1);
				index.updateQueue(msg, toPush);
				let stream = ytdl(`https://www.youtube.com/watch?v=${nextStream.vidID}`, {quality: "highest", filter : 'audioonly'});

				return this.initializeStream(msg, stream, "fixcommand");
			}
			case "skip": {
				if(this.client.voice.connections.get(msg.guild.id)) {
					this.client.voice.connections.get(msg.guild.id).dispatcher.end();
					return msg.say("✅ | Skipping this song...");
				}
				return msg.say("⚠ | There is nothing currently playing.");
			}
			case "queue": {
				if(query == "") query = 1;
				if(isNaN(query)) return msg.say("⚠ | That's not a valid number.");
				query = parseInt(query);
				let array = await index.getQueue(msg);
				if(array.length == 0) return msg.say("⚠ | There are no songs in the queue.");
				let formattedArray = ["The current queued up songs are:\n"];
				for(let i = 1;i<array.length && i<=10;i++) {
					formattedArray.push(`${i*query}. **${array[i*query].title}**`);
				}
				formattedArray.join("\n");
				return msg.say(formattedArray);
			}
			case "clear": {
				index.destroyQueue(msg);
				return msg.say("✅ | The queue has been cleared.");
			}
			case "help": {
				return msg.say("⚠ | Type `Ink help music` for help.");
			}
			case "shuffle": {
				let array = await index.getQueue(msg);
				if(array.length <= 1) return msg.say("⚠ | There is nothing to shuffle.");
				function shuffle (array) { //Admittedly I stole this shuffle from the internet.
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
				shuffle(array);
				index.updateQueue(msg, array);
				return msg.say("✅ | The queue has been shuffled!");
			}
			case "remove": {
				let getQ = await index.getQueue(msg);
				if(isNaN(query)) return msg.say("⚠ | That's not a valid number.");
				let test = getQ.splice(parseInt(query)-1, 1);
				if(test.length != 1) return msg.say("⚠ | That number is not in the queue.");
				index.updateQueue(msg, getQ);
				return msg.say(`✅ | **${test[0].title}** has been removed from the queue.`)		
			}
			case "resume":
			if(this.client.voice.connections.get(msg.guild.id)) return msg.say("❌ | I cannot resume, because I am already playing!")
			let toPush = await index.getQueue(msg);
			if(toPush.length == 0) return msg.say("⚠ | There is nothing in the queue to resume.");
			let nextStream = toPush[0];
			toPush.splice(0, 1);
			index.updateQueue(msg, toPush);
			let stream = ytdl(`https://www.youtube.com/watch?v=${nextStream.vidID}`, {quality: "highest", filter : 'audioonly'});
			return this.initializeStream(msg, stream, nextStream.title);
		}
	   
	}

	async initializeStream(msg, stream, title) {
		msg.member.voiceChannel.join().then(connection => {
			function inactivityDetectionFn(x, msg) {
				if(!msg.guild.me.voiceChannel) return clearInterval(x);
				if(msg.guild.me.voiceChannel.members.filter(member => !member.user.bot && !member.deaf).size < 1 || msg.guild.me.mute) {
					clearInterval(x);
					msg.guild.voiceConnection.dispatcher.end("inactivity");
				}
			}
			setInterval(function() {inactivityDetectionFn(this, msg)}, 10000);
			let dispatcher = connection.playStream(stream);
			title != "fixcommand" ? msg.say(`ℹ | Now playing: **${title}**`) : msg.say(`✅ | Fixing playback.`);
			dispatcher.on('end', async (reason) => {
				if(reason == "inactivity") {
					msg.say("⚠ | I have left the channel due to inactivity, but the queue has been saved. Use `Ink music resume` to resume.")
					return connection.disconnect();
				}
				if(await index.getQueue(msg).length == 0) {
					connection.disconnect();
					return msg.say("ℹ | There are no more songs in the queue, disconnecting.");
				}
				return this.continueStream(msg, connection);
			});
		}).catch(e => console.log(e));
	}

	async continueStream(msg, connection) {
		function inactivityDetectionFn(x, msg) {
			if(!msg.guild.me.voiceChannel) return clearInterval(x);
			if(msg.guild.me.voiceChannel.members.filter(member => !member.user.bot && !member.deaf).size < 1 || msg.guild.me.mute) {
				clearInterval(x);
				msg.guild.voiceConnection.dispatcher.end("inactivity");
			}
		}
		setInterval(function() {inactivityDetectionFn(this, msg)}, 10000);
		let toPush = await index.getQueue(msg);
		let nextStream = toPush[0];
		if(!nextStream) {
			connection.disconnect();
			return msg.say("ℹ | There are no more songs in the queue, disconnecting.");
		} 
		toPush.splice(0, 1);
		index.updateQueue(msg, toPush);
		let stream = ytdl(`https://www.youtube.com/watch?v=${nextStream.vidID}`);
		let dispatcher = connection.playStream(stream);
		msg.say(`ℹ | Now playing: **${nextStream.title}**`)	;
		dispatcher.on('end', async (reason) => {
			if(reason == "inactivity") {
				msg.say("⚠ | I have left the channel due to inactivity, but the queue has been saved. Use `Ink music resume` to resume.")
				return connection.disconnect();
			}			
			return this.continueStream(msg, connection);
		})
	}
};