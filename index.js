const path               = require('path');
const secure             = require('./secure.json');
const database           = require('./database.js');
const { CommandoClient } = require('discord.js-commando');
var db = database.get();

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
		['fun', 'Fun commands'],
		['roles','Role commands'],
		['moderation','Moderation commands'],
		['search','Search commands'],
		['reaction','Reaction commands'],
		['misc', 'Miscellaneous commands'],
		['owner', 'Owner commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands() //default commands like help and a bunch of other garbage
	.registerCommandsIn(path.join(__dirname, 'commands'));




Ink.on(`ready`, async () => {
	//These are for caches.
	customReactionsArray = await database.customReactionDatabaseSync();
	channelBansArray     = await database.channelBansDatabaseSync();
	Ink.user.setGame('Pilot Iroshizuku Kon-Peki');
	console.log(`I\'m feeling great and ready exist!!!`); //when the boye is ready he lets us know
});

async function start() {
	await database.sync();
	Ink.login(secure.token); //logs the bot in obv, nice try caelum
}

Ink.on('message', async (message) => {
	if(message.author.bot) return;
	var reactionObject = customReactionsArray.find(obj => {
		return (obj.guildID.substring(0,obj.guildID.length-1) == message.guild.id) && (obj.trigger == message.content);
	});
	if(!reactionObject) return;
	message.channel.send(reactionObject.content);
});

Ink.dispatcher.addInhibitor(msg => { //the inhibitor will allow commands if it gets returned 'false' but if it gets 'true' the command is blocked.
	if(msg.command){	
		if((msg.command.name == 'channelban' || msg.channel.type == 'dm' ) || msg.command.name == 'eval')  return false; //DMs and the commands eval and channelban will ignore the command block.
		var test = channelBansArray.find(obj => { //cache from the db of channelbans.
			if(obj.guildID == `${msg.guild.id}d` || obj.channelID == `${msg.channel.id}d`) return obj; //if the object exists in the array this finds it and returns it
		});
		if(test == undefined){ //if there isnt an object, test stays undefined and since it's undefined that means the channel isnt banned so
			return false; //the command runs
		}
		return true; //if test is defined, it fails the if, meaning theres a matching channel that's banned, the command isn't allwed to run.
	}
});
