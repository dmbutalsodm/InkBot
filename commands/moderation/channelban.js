const { Command } = require('discord.js-commando');
const index = require('../../index.js');
const database = require('../../database.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'channelban',
            group: 'moderation',
            memberName: 'channelban',
            description: 'Toggles Ink ban in the channel this command is used in.'
        });
    }

	async run(msg) { 
        var db = database.get(); //Still no idea, Lex.
        var test = await db.all(`SELECT channelID FROM channelbans WHERE guildID = '${msg.guild.id}d' AND channelID = '${msg.channel.id}d';`) //Check if Ink is already banned in this channel
        if(test.length == 0) {
            db.run(`INSERT INTO channelbans (guildID, channelID) VALUES ('${msg.guild.id}d', '${msg.channel.id}d');`); //Adds this channel to the db.
            return msg.say('I\'m no longer allowed to speak in this channel.');
        }
        if(test.length > 0){
            db.run(`DELETE FROM channelbans WHERE guildID = '${msg.guild.id}d' AND channelID = '${msg.channel.id}d';`);
            return msg.say("I\'m now allowed to speak in this channel again. Welcome back Ink!");
        }
	}
};