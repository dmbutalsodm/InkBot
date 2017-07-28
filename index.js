const path     = require('path');
const secure   = require('./secure.json');
const database = require('./database.js');

const { CommandoClient } = require('discord.js-commando');

const Ink = new CommandoClient({
    owner: ['296895991985078272', '147604925612818432'],
    commandPrefix: ',',
    disableEveryone: true
});

//await db.run("CREATE TABLE IF NOT EXISTS roles (role TEXT);");
//db.run("INSERT INTO roles (role) VALUES (test);");
var db;
database.sync().then(database => {
	db = database;
	start();
});

Ink.registry
    .registerDefaultTypes()
    .registerGroups([
        ['fun', 'Commands that\'re for fun and don\'t do anything important.'],
        ['owner', 'Commands reserved for the owner of the bot.'], //hype
        ['roles','Commands related to managing roles.']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands() //default commands like help and a bunch of other garbage
    .registerCommandsIn(path.join(__dirname, 'commands'));

    
Ink.on(`ready`, () => {
    console.log(`I\'m ready and excited to be alive!!!`); //when the boye is ready he lets us know
    Ink.user.setGame('안녕하세요 송서연!!!!');
});

function start() {
	Ink.login(secure.token) //logs the bot in obv lmao
}