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
			examples: ['1channelban'],
			details: 'Toggles the channel ban. When the channel ban is engaged, Ink will not respond to commands that are run in that channel.'
		});
	}

	async run(msg) { 
		if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.say("You don't have permission to manage messages!"); //if they dont have permission the command isnt run
		var provider = this.client.provider;
		var test = provider.get(msg.guild, 'channelBans', []); //Check if Ink is already banned in this channel
		if(!test.includes(msg.channel.id)) { //by testing if it exists first we can make a toggle command, this is the does-not-exist response
			test.push(msg.channel.id) //Adds this channel to the db.
			provider.set(msg.guild, 'channelBans', test);
			return msg.say('I\'m no longer allowed to speak in this channel.');
		}
		if(test.includes(msg.channel.id)){ //exists response
			test.splice(test.indexOf(msg.channel.id),1) //removes the channel from the array
			provider.set(msg.guild, 'channelBans', test); //sets the setting to the spliced array
			return msg.say("I\'m now allowed to speak in this channel again. Welcome back Ink!"); //hi
		}
	}
};