const path               = require('path');
const secure             = require('./secure.json');
const { CommandoClient } = require('discord.js-commando');
const Commando           = require('discord.js-commando');
const databaseClass      = require('./database.js');
const sqlite             = require('sqlite');

const Ink = new CommandoClient({
	owner: ['296895991985078272', '147604925612818432'],
	commandPrefix: secure.betaObject ? secure.betaObject.prefix : "1",
	disableEveryone: true,
	unknownCommandResponse: false,
});

start();

Ink.registry
	.registerDefaultTypes()
	.registerGroups([
		['moderation','Moderation commands'],
		['roles','Role commands'],
		['search','Search commands'],
		['music', 'Music commands'],
		['channel', 'Channel commands'],
		['misc', 'Miscellaneous commands'],
		['fun', 'Fun commands'],
		['owner', 'Owner commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands() //default commands like help and a bunch of other garbage
	.registerCommandsIn(path.join(__dirname, 'commands'));




Ink.on(`ready`, async () => {
	setInterval(() => {loggedStarredMessages = [];}, 259200000); //Messages that get starred won't go to the starboard twice if the message is less than three days old.
	console.log(`I\'m feeling great and ready exist!!!`); //when the boye is ready he lets us know
});

async function start() {
	Ink.login(secure.token); //logs the bot in obv, nice try caelum
	databaseClass.start();
}

Ink.on('message', async (message) => {
	if(message.author.bot) return;
	var reactionObject = Ink.provider.get(message.guild, 'customReactions', []);
	var toSay = reactionObject.find((x) => {
		if(message.content == x.trigger) return x
	});
	if(toSay) return message.channel.send(toSay.content);
});

var loggedStarredMessages = []; //declared here so it's global in the file

Ink.on('messageReactionAdd', (messageReactionObject) => {
	let msg = messageReactionObject.message;
	if(!msg.guild.me.hasPermission("EMBED_LINKS")) return Ink.provider.remove(msg.guild, 'starboardChannel'); //if Ink can't embed links, destroy the starboard
	if(!msg.guild.me.hasPermission("ADD_REACTIONS")) return Ink.provider.remove(msg.guild, 'starboardChannel'); //If cant react destroy starboard
	if(messageReactionObject.message.author == Ink.user) return; //if Ink gets starred, it's ignored.
	if(loggedStarredMessages.includes(messageReactionObject.message.id)) return; //if the message was starred in the past three days ignore it
	if(messageReactionObject.message.channel.type == 'dm') return; //if the star in in DMs ignore it
	let percentageToPercentify = Number(Ink.provider.get(messageReactionObject.message.guild, 'starboardPercentage', .05)) / 100;
	if(messageReactionObject.emoji.name == "⭐" && messageReactionObject.count >= Math.floor(messageReactionObject.message.guild.memberCount * percentageToPercentify)) { //if the emote is star and the count is above 5% of members OR the server set percent
		let channelToMessage = messageReactionObject.message.guild.channels.find("id", Ink.provider.get(messageReactionObject.message.guild, 'starboardChannel', 'failedToFind')); //see if a starboard channel exists on this server
		if(!channelToMessage) return; //if it doesnt ignore it
		messageReactionObject.message.react("🚀"); //if the post will go to the starboard, react with a rocket
		loggedStarredMessages.push(messageReactionObject.message.id); //add the message to the already logged array
		channelToMessage.send('🚀 A new rocket is landing in 30 seconds! 🚀').then((message) => message.delete(30000)).catch(() => Ink.provider.remove(msg.guild, 'starboardChannel')); //sends a message that'll be deleted to the starboard channel, that the message is coming.
		setTimeout(function () { //after 30 seconds, the embed is sent, the timer is to let any final stars come in.
			if(!messageReactionObject.message.reactions.get('%E2%AD%90')) return;
			channelToMessage.send(
				{embed: {
					color: 14215552,
					author: {
						name: `New, from ${msg.author.username} in #${msg.channel.name}!`,
						icon_url: `${msg.author.avatarURL ? msg.author.avatarURL : "http://is1.mzstatic.com/image/thumb/Purple117/v4/a1/d8/3a/a1d83a42-e84e-5965-c006-610fb8a1fd45/source/300x300bb.jpg"}`
					},
					"image": {
						"url": msg.attachments.first() ? msg.attachments.first().url : '' //if an attachment exists, add it to the embed
					},
					fields: [
						{
							name: "Content:",
							value: `${msg.content ? msg.content : "~"}` //Because the text cannot be empty.
						},
					],	
					"footer": {
						"icon_url": "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/103/white-medium-star_2b50.png", //star emote
						"text": `${messageReactionObject.message.reactions.get('%E2%AD%90').count}` //Final reaction count.
					}		
				}}
			);
		}, 30000); //Wait for 30s.
	}	
});

Ink.dispatcher.addInhibitor(msg => { //the inhibitor will allow commands if it gets returned 'false' but if it gets 'true' the command is blocked.
	if(msg.command){	
		if(msg.command.name == 'channelban'|| msg.channel.type == 'dm' || msg.command.name == 'eval') return false; //The channelban is automatically allowed to pass, same with DM commands.
		if(Array.from(Ink.registry.groups.get("owner").commands.keys()).includes(msg.command.name)) return false; //Owner commands are automatically allowed to pass.
		var test = Ink.provider.get(msg.guild, 'channelBans', []);
		if(test.includes(msg.channel.id)) return true;
	}
});

Ink.setProvider( //makes the settingsprovider connection
    sqlite.open(path.join(__dirname, 'settings.sqlite')).then(settingsProvider => new Commando.SQLiteProvider(settingsProvider)) 
).catch(console.error);
