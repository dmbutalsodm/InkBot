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
			guildOnly: true,
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
					var testForRoleInDB = await db.all(`SELECT roleID FROM roles WHERE roleID = '${role.id}d' AND guildID = '${msg.guild.id}d';`);
					if(testForRoleInDB.length > 0) return msg.say("This role is already subscribable!");
					db.run(`INSERT INTO roles (roleID, guildID) VALUES ('${role.id}d', '${msg.guild.id}d');`);
					msg.say(`The role '${role.name}' is now available to subscribe to.`);
					break;
				case "remove":
					db.run(`DELETE FROM roles WHERE roleID='${role.id}d' AND guildID = '${msg.guild.id}d';`);
					msg.say(`The role '${role.name}' is no longer available to subscribe to.`);
					break;
				default: msg.say("That isn't a valid option.");
			}
		} else {msg.say("You don't have permission for this! (Manage_roles)")}
		
	}
};
