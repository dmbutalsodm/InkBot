const path     = require('path');
const secure   = require('./secure.json');
const database = require('./database.js');

const { CommandoClient } = require('discord.js-commando');

const Ink = new CommandoClient({
    owner: ['296895991985078272', '147604925612818432'],
    commandPrefix: '1',
    disableEveryone: true
});

start();

Ink.registry
    .registerDefaultTypes()
    .registerGroups([
        ['fun', 'Fun commands'],
        ['roles','Role commands'],
        ['moderation','Moderation commands'],
        ['search','Search commands'],
        ['owner', 'Owner commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands() //default commands like help and a bunch of other garbage
    .registerCommandsIn(path.join(__dirname, 'commands'));

    
Ink.on(`ready`, () => {
    console.log(`I\'m ready and excited to be alive!!!`); //when the boye is ready he lets us know
    Ink.user.setGame('South Side $uicide');
});

async function start() {
	await database.sync();
	Ink.login(secure.token) //logs the bot in obv lmao
}