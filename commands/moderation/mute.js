const { Command } = require('discord.js-commando');
const database = require('../../database.js');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			group: 'moderation',
			memberName: 'mute',
            description: 'Mutes the selected user.',
            details: 'Mutes the selected user. While they are muted, they cannot speak in any channel.',
            examples: ['1mute <Petty Person>'],
            format: "<member>",
            guildOnly: true,
            args:[
                    {
                        key:"user",
                        prompt:"Which user would you like to mute?",
                        type:"user",
                    }
            ]
            
		});
	}

	async run(msg, args) { 	
        const { user } = args;
        var settingsProvider = this.client.provider;
        if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.say("I don't have permission to manage roles!");
		if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.say("You don't have permission to manage messages!"); //Permissions check, line above too
        //below block is if the muterole already exists.
        var existRole = settingsProvider.get(msg.guild, 'mute role id');
        if(existRole) { //if the role exists for this guild in the settingsProvider
            if(msg.guild.roles.find('id', existRole) == null) { //this block deletes the entry from the db if the role doesnt exist
                settingsProvider.remove(msg.guild, 'mute role id'); //meaning if the role was deleted, it's still in the db but doesnt exist
                return msg.say('Run this command again, and do not delete the Ink Mute role.'); //don't delete it, thanks.
            }
            if(msg.guild.members.get(user.id).roles.get(existRole)) return msg.say(`**${user.username}** is already muted, use the unmute command to unmute them.`) //if the user has the role (them having the mute role exists), say they have it
            msg.guild.members.get(user.id).addRole(existRole); //else mute them
            return msg.say(`**${user.username}** has been muted.`);
        }
        //below block is if the muterole needs to be made.
        var roleOptions = {
        name: "Ink Mute" //options for the new role
        }
        await msg.guild.createRole(roleOptions); //wait for the new role to be made
        msg.guild.channels.forEach((x) => {x.overwritePermissions(msg.guild.roles.find('name', "Ink Mute"),{'SEND_MESSAGES': false})}); //for every channel in the guild, make the muterole unable to speak
        msg.guild.members.get(user.id).addRole(msg.guild.roles.find('name','Ink Mute')); //give the mentioned user the muterole
        msg.say(`**${user.username}** has been muted.`); //they're now muted...
        var dbStorage = msg.guild.roles.find('name','Ink Mute'); //find the role
        settingsProvider.set(msg.guild, 'mute role id', dbStorage.id);
    };
};