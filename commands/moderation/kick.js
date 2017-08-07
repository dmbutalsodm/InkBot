const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Bans the user you mention, requires confirmation.',
            examples: ['kick <Annoying Adolescent>'],
            guildOnly: true,
            args:[
                    {
                        key:"user",
                        prompt:"Which user would you like to kick?",
                        type:"user",
                    },
                    {
                        key: "reason",
                        prompt: "lalalalala",
                        type:"string",
                        default: ''
                    }
            ]
            
		});
	}

	async run(msg, args) { 	
        if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.say("You don't have permission to kick members!");
        
        const { user, reason } = args;
        msg.guild.members.get(`${user.id}`).kick();
        return msg.say(`**👢 ${user.username}** has been kicked.`)
	}
};