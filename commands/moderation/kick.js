const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Kicks the selected user.',
			details: 'Kicks the selected user.',
			examples: ['kick <Annoying Adolescent>'],
			format: '<member>',
			guildOnly: true,
			args:[
					{
						key:"user",
						prompt:"Which user would you like to kick?",
						type:"user",
					},
			]
			
		});
	}

	async run(msg, args) {
		if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.say("You don't have permission to kick members!");
		
		const { user, reason } = args;
		msg.guild.members.get(`${user.id}`).kick().then((x) => { //promise accepted
			return msg.say(`**👢 ${user.username}** has been kicked.`);
		}, (x) => { //rejection
			return msg.say("I don't have permission for this!");
		});
		
	}
};