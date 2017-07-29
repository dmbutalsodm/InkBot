const { Command } = require('discord.js-commando');
const database = require('../../database.js');


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'subable',
			group: 'roles',
			memberName: 'subable', 
			description: 'Used to manage which roles are subscribable.',
			examples: ['subable add [role name]'],
			args:[
					{
						key: 'option',
						prompt: 'Would you like to add or remove a subscribable role?',
						type: 'string'
					},
					{
						key: 'role',
						prompt: 'Which role would you like to change?',
						type: 'role'
					}
				]
		});
	}

	async run(msg,args) {
		const { option,role } = args;
		var db = database.get();
		if(msg.member.permissions.has("MANAGE_ROLES")){
			switch(option.toLowerCase()){
				case "add":
					await db.run(`CREATE TABLE IF NOT EXISTS roles${msg.guild.id} (roleID STRING)`);
					db.run(`INSERT INTO roles${msg.guild.id} (roleID) VALUES ('${role.id}d');`);
					msg.say(`The role '${role.name}' is now available to subscribe to.`);
					break;
				case "remove":
					db.run(`DELETE FROM roles${msg.guild.id} WHERE roleID='${role.id}'`);
					msg.say(`The role '${role.name}' is no longer available to subscribe to.`);
					break;
				default: msg.say("That isn't a valid option.");
			}
		} else {msg.say("You don't have permission for this! (Manage_roles)")}
		
	}
};
