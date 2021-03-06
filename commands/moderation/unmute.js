const { Command } = require('discord.js-commando');
const database = require('../../database.js');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unmute',
			group: 'moderation',
			memberName: 'unmute',
            description: 'Mutes the selected user.',
            details: 'Unmutes the selected user if they are muted.',
            examples: ['1unmute <Petty Person>'],
            format: "<member>",
            guildOnly: true,
            args:[
                    {
                        key:"user",
                        prompt:"Which user would you like to unmute?",
                        type:"user",
                    }
            ]
            
		});
	}

	async run(msg, args) { 	
        const { user } = args;
        if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.say("I don't have permission to manage roles!");
		if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.say("You don't have permission to manage messages!"); //Permissio   ns check, line above too

        var settingsProvider = this.client.provider;
        var existRole = await settingsProvider.get(msg.guild, 'mute role id');
        if(existRole) { //if the role exists for this guild in the settingsProvider.
            if(msg.guild.roles.find('id', existRole) == null) { //this block deletes the entry from the db if the role doesnt exist
                settingsProvider.remove(msg.guild, 'mute role id'); //meaning if the role was deleted, it's still in the db but doesnt exist
                return msg.say('Run this command again, and do not delete the Ink Mute role.'); //don't delete it, thanks.
            }
        }
        if(msg.guild.members.get(user.id).roles.get(existRole)) { //if getrole exists (they have the role)
            msg.guild.members.get(user.id).removeRole(existRole); //remove the role
            return msg.say(`**${user.username}** is no longer muted.`);
        }
        return msg.say(`**${user.username}** cannot be unmuted, because they were not already muted.`); //if it doesnt exist on them, say they weren't
        
	}
};