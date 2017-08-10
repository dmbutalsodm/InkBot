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
        if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.say("I don't have permission to manage roles!");
		if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.say("You don't have permission to manage messages!"); //Permissions check, line above too
        
        var db = database.get();
        var existTest = await db.all(`SELECT * FROM guildmuteroles WHERE guildID = '${msg.guild.id}d'`);
        var existRole = existTest[0].roleID.substring(0,existTest[0].roleID.length-1);
        if(existTest.length > 0) {
            if(msg.guild.roles.find('id', existRole) == null) { 
                db.run(`DELETE FROM guildmuteroles WHERE guildID = '${msg.guild.id}d';`);
                return msg.say('Run this command again, and do not delete the Ink Mute role.');
            }
            if(msg.guild.members.get(user.id).roles.get(existRole) !== undefined) return msg.say(`**${user.username}** is already muted, use the unmute command to unmute them.`)
            msg.guild.members.get(user.id).addRole(existRole);
            return msg.say(`**${user.username}** has been muted.`);
        }

        var roleOptions = {
        name: "Ink Mute"
        }
        await msg.guild.createRole(roleOptions);
        msg.guild.channels.forEach((x) => {x.overwritePermissions(msg.guild.roles.find('name', "Ink Mute"),{'SEND_MESSAGES': false})});
        msg.guild.members.get(user.id).addRole(msg.guild.roles.find('name','Ink Mute'));
        msg.say(`**${user.username}** has been muted.`);
        var dbStorage = msg.guild.roles.find('name','Ink Mute');
        db.run(`INSERT INTO guildmuteroles (roleID, guildID) VALUES ('${dbStorage.id}d', '${msg.guild.id}d');`);
	};
};