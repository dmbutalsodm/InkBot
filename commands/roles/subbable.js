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
		var db = database.get(); //Literally no idea what this does, Lex.
		if(msg.member.permissions.has("MANAGE_ROLES")){ //If the user can manage roles, the command is executed.
			switch(option.toLowerCase()){
				case "add":
					var testForRoleInDB = await db.all(`SELECT roleID FROM roles WHERE roleID = '${role.id}d' AND guildID = '${msg.guild.id}d';`);//Checks if the role exists in the db.
					if(testForRoleInDB.length > 0) return msg.say("This role is already subscribable!"); //It does.
					db.run(`INSERT INTO roles (roleID, guildID) VALUES ('${role.id}d', '${msg.guild.id}d');`); //If it doesn't, it's added to the db.
					msg.say(`The role **${role.name}** is now available to subscribe to.`);
					break;
				case "remove": //2 options for removing with fall-through.
				case "delete":
					db.run(`DELETE FROM roles WHERE roleID='${role.id}d' AND guildID = '${msg.guild.id}d';`); //Deletes the role from the table if it exists.
					msg.say(`The role **${role.name}** is not able to be subscribed to.`); //Sends this regardless if it exists or not. 
					break;
				default: msg.say("That isn't a valid option.");
			}
		} else {msg.say("You don't have permission to manage roles!")} //No manage roles permission.
		
	}
};
