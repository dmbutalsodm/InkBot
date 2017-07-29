const { Command } = require('discord.js-commando');
const database = require('../../database.js');


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unsub',
			group: 'roles',
			memberName: 'unsub', 
			description: 'Used to unsubscribe from a role.',
			examples: ['unsub [role name]'],
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
		var roleList = await db.all(`SELECT roleID FROM roles${msg.guild.id};`);
		roleList = roleList.map((x) => {return x.roleID.toString()});
        if(roleList.indexOf(role.id) > -1){msg.member.removeRole(role.id.toString());msg.say(`You've unsubscribed from ${role.name}.`);} else{msg.say("You cannot unsubscribe from this role!");}
	}
};
