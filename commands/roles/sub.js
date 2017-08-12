const { Command } = require('discord.js-commando');
const database = require('../../database.js');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sub',
			group: 'roles',
			memberName: 'sub', 
			description: 'Used to subscribe to a role.',
			details: 'If the selected role is on the sublist for this guild, this command subscribes you to it.',
			examples: ['1sub <role>'],
			guildOnly: true,
			args:[
				{
					key: 'role',
					prompt: 'Which role would you like to add?',
					type: 'role'
				}
			]
		});
	}
	
	async run(msg,args) {
		const { role } = args;
		var provider = this.client.provider;
		var roleList = provider.get(msg.guild, 'subableRoles', []); //Grabs all the subable roles in the db from this guild as an array.		
		if(!roleList.includes(role.id)) return msg.say(`You cannot subscribe to **${role.name}**!`); //If the role ID isn't in the array.
		msg.member.addRole(role.id).then(() => { //The role is given to the member if it's in the array.
			return msg.say(`You've subscribed to **${role.name}**.`);
		}).catch((x) => { //If the promise is rejected, since it can only be rejected for permission error, the rejection is handled.
			return msg.say('I don\'t have permission for that!');
		});
	}
};
