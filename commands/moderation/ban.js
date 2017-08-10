const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'moderation',
			memberName: 'ban',
            description: 'Bans the selected user.',
            details: 'Bans the selected user. They\'re banned instantly and without confirmation, so pick carefully.',
            examples: ['1ban <Malicious Man>'],
            format: "<member>",
            guildOnly: true,
            args:[
                    {
                        key:"user",
                        prompt:"Which user would you like to ban?",
                        type:"user",
                    },
                    {
                        key: "reason",
                        prompt: "You should never see this.",
                        type:"string",
                        default: ''
                    }
            ]
            
		});
	}

	async run(msg, args) { 	
        if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.say("You don't have permission to ban members!");
        var { user, reason } = args;
        msg.guild.members.get(`${user.id}`).ban(0, reason).then((x) => { //permission has/promise accepted
            if(reason.substring(0,4) == 'for ') reason = reason.substring(4); 
            return msg.say(`**🔨 ${user.username}** has been banned${reason == '' ? `` : ` for **` + reason + `**`}.`);
        }, (x) => { //no permission/promise rejected
            return msg.say("I don't have permission for this!");
        });
        
	};
};