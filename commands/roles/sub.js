const { Command } = require('discord.js-commando');
const database = require('../../database.js');


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sub',
			group: 'roles',
			memberName: 'sub', 
			description: 'Used to subscribe to a role.',
			examples: ['sub [role name]'],
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
		var db = database.get();
		var roleList = await db.all(`SELECT roleID FROM roles WHERE guildID = '${msg.guild.id}d'`); //gets all the roles that're in the table from this guild as an object
		roleList = roleList.map((x) => {return x.roleID}); //turns the objects to just an an array with role IDs
		if(!roleList.includes(role.id+'d')) return msg.say("You cannot subscribe to this role!");
		if(roleList.includes(role.id+'d')) {
			msg.member.addRole(role.id);
			msg.say(`You've subscribed to ${role.name}.`);
		} 
	}
};
