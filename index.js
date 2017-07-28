//setup block
const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database(':memory:');
const secure = require('./secure.json');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const client = new CommandoClient({
	owner: '147604925612818432',
	commandPrefix: '1',
	disableEveryone: true
});

await db.run("CREATE TABLE IF NOT EXISTS roles (role TEXT);");
db.run("INSERT INTO roles (role) VALUES (test);");


client.registry
	.registerDefaultTypes()
	.registerGroups([
		['fun', 'Commands that\'re for fun and don\'t do anything important.'],
		['owner', 'Commands reserved for the owner of the bot.'], //hype
		['roles','Commands related to managing roles.']
	])
	.registerDefaultGroups()
	.registerDefaultCommands() //default commands like help and a bunch of other garbage
	.registerCommandsIn(path.join(__dirname, 'commands'));

	
client.on(`ready`, () => {
	console.log(`I\'m ready and excited to be alive!!!`); //when the boye is ready he lets us know
	client.user.setGame('안녕하세요 송서연!!!!');
});
client.login(secure.token) //logs the bot in obv lmao