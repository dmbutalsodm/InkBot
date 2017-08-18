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
		['misc', 'Miscellaneous commands'],
		['fun', 'Fun commands'],
		['owner', 'Owner commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands() //default commands like help and a bunch of other garbage
	.registerCommandsIn(path.join(__dirname, 'commands'));




Ink.on(`ready`, async () => {
	Ink.user.setGame(inks.randomInk());
	timers.setInterval(() => Ink.user.setGame(inks.randomInk()), 600000);
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
