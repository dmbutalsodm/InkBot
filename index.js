const path               = require('path');
const secure             = require('./secure.json');
const database           = require('./database.js');
const { CommandoClient } = require('discord.js-commando');
const db                 = database.get();
const inks               = require('./inks.js');
const sqlite             = require('sqlite');
const Commando           = require('discord.js-commando');
const timers             = require('timers');

module.exports = {
	customReactionsArrayPush: async (obj) => {
		customReactionsArray.push(obj);
	}, //
	rebuildCustomReactionsArray: async () => {
		customReactionsArray = await database.customReactionDatabaseSync();
	},
	channelBansArrayPush: async (obj) => {
		channelBansArray.push(obj);
	},
	rebuildChannelBansArray: async () => {
		channelBansArray = await database.channelBansDatabaseSync();
	},
}

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
		['channel', 'Channel commands'],
		['misc', 'Miscellaneous commands'],
		['fun', 'Fun commands'],
		['owner', 'Owner commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands() //default commands like help and a bunch of other garbage
	.registerCommandsIn(path.join(__dirname, 'commands'));


var loggedStarredMessages = [];

Ink.on(`ready`, async () => {
	Ink.user.setGame(inks.randomInk());
	timers.setInterval(() => Ink.user.setGame(inks.randomInk()), 600000);
	timers.setInterval(() => {loggedStarredMessages = [];}, 259200000)
	inks.inkDBBuild();
	console.log(`I\'m feeling great and ready exist!!!`); //when the boye is ready he lets us know
});

async function start() {
	await database.sync();
	Ink.login(secure.token); //logs the bot in obv, nice try caelum
}

Ink.on('message', async (message) => {
	if(message.author.bot) return;
	var reactionObject = Ink.provider.get(message.guild, 'customReactions', []);
	var toSay = reactionObject.find((x) => {
		if(message.content == x.trigger) return x
	});
	if(toSay) return message.channel.send(toSay.content);
});

Ink.on('messageReactionAdd', (messageReactionObject, user) => {
	if(messageReactionObject.message.author == Ink.user) return;
	if(loggedStarredMessages.includes(messageReactionObject.message.id)) return; //if the message was starred in the past three days ignore it
	if(messageReactionObject.message.channel.type == 'dm') return; //if the star in in DMs ignore it
	percentageToPercentify = Number(Ink.provider.get(messageReactionObject.message.guild, 'starboardPercentage', .05)) / 100;
	if(messageReactionObject.emoji.name == "⭐" && messageReactionObject.count >= Math.floor(messageReactionObject.message.guild.memberCount * percentageToPercentify)) { //if the emote is star and the count is above 5% of members OR the server set percent
		let channelToMessage = messageReactionObject.message.guild.channels.find("id", Ink.provider.get(messageReactionObject.message.guild, 'starboardChannel', 'failedToFind')); //see if a starboard channel exists on this server
		if(!channelToMessage) return; //if it doesnt ignore it
		messageReactionObject.message.react("🚀"); //if the post will go to the starboard, react with a rocket
		loggedStarredMessages.push(messageReactionObject.message.id); //add the message to the already logged array
		let msg = messageReactionObject.message;
		channelToMessage.send('🚀 A new rocket is landing in 30 seconds! 🚀').then((message) => message.delete(30000));
		timers.setTimeout(function () {
			channelToMessage.send(
				{embed: {
					color: 14215552,
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					"image": {
						"url": msg.attachments.first() ? msg.attachments.first().url : ''
					},
					title: `New starred post from ${messageReactionObject.message.author.username}!`,
					fields: [
						{
							name: "Content:",
							value: `${msg.content ? msg.content : "(This message had a shocking lack of text content)"}`
						},
					],	
					"footer": {
						"icon_url": "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/103/white-medium-star_2b50.png",
						"text": messageReactionObject.message.reactions.get('%E2%AD%90').count
					}		
				}}
			);
		}, 30000);
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
