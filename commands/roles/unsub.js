const { Command } = require('discord.js-commando');
const database = require('../../database.js');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unsub',
			group: 'roles',
			memberName: 'unsub', 
			description: 'Used to unsubscribe from a role.',
			format: '<role>',
			examples: ['1unsub <role name>'],
			details: 'If the selected role is on the sublist for this guild, this command unsubscribes you from it.',
			guildOnly: true,
			args:[
				{
					key: 'role',
					prompt: 'Which role would you like to remove?',
					type: 'role'
				}
			]
		});
	}
	
	async run(msg,args) {
		const { role } = args;
		var db = database.get();
		var roleList = await db.all(`SELECT roleID FROM roles WHERE guildID = '${msg.guild.id}d'`); //Gets all the roles that're in the table from this guild as an object
		roleList = roleList.map((x) => {return x.roleID}); //Turns the objects to just an an array with role IDs
		if(!roleList.includes(role.id+'d')) return msg.say("You cannot unsubscribe from this role!"); 
		msg.member.removeRole(role.id).then(() => { 
			return msg.say(`You've unsubscribed from **${role.name}**.`); //Sends this regardless.
		}).catch((x) => {
			return msg.say('I don\'t have permission for that!'); //If the promise is rejected, since it can only be rejected for permission error, the rejection is handled.
		});
	}
};
