const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'moderation',
			memberName: 'ban',
			description: 'Bans the user you mention, requires confirmation.',
            examples: ['ban <Malicious Man>'],
            guildOnly: true,
            args:[
                    {
                        key:"user",
                        prompt:"Which user would you like to ban?",
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
        if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.say("You don't have permission to ban members!");
        
        const { user, reason } = args;
        msg.guild.members.get(`${user.id}`).ban(0, reason);
        return msg.say(`**🔨 ${user.username}** has been banned for **${reason}**.`)
	}
};