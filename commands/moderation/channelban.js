const { Command } = require('discord.js-commando');
const index = require('../../index.js');
const database = require('../../database.js');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'channelban',
			group: 'moderation',
			memberName: 'channelban',
			description: 'Toggles Ink ban in the channel this command is used in.',
			guildOnly: true,
		});
	}

	async run(msg) { 
		if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.say("You don't have permission to manage messages!"); //if they dont have permission the command isnt run

		var db = database.get(); //Still no idea, Lex.
		var test = await db.all(`SELECT channelID FROM channelbans WHERE guildID = '${msg.guild.id}d' AND channelID = '${msg.channel.id}d';`) //Check if Ink is already banned in this channel
		if(test.length == 0) { //by testing if it exists first we can make a toggle command, this is the does-not-exist response
			db.run(`INSERT INTO channelbans (guildID, channelID) VALUES ('${msg.guild.id}d', '${msg.channel.id}d');`); //Adds this channel to the db.
			index.rebuildChannelBansArray(); //this function is in index and goes to database from index its funny 
			return msg.say('I\'m no longer allowed to speak in this channel.');
		}
		if(test.length > 0){ //exists response
			db.run(`DELETE FROM channelbans WHERE guildID = '${msg.guild.id}d' AND channelID = '${msg.channel.id}d';`); //deletes that sh
			index.rebuildChannelBansArray(); //index thing
			return msg.say("I\'m now allowed to speak in this channel again. Welcome back Ink!"); //hi
		}
	}
};