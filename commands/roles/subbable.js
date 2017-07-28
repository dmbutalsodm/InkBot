const { Command } = require('discord.js-commando');

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
		if(msg.member.permissions.has("MANAGE_ROLES")){
			switch(option){
				case "add":
				msg.say("boy says add");
				db.run()
				break;
				case "remove":
				msg.say("boy says remove");
				break;
				default: msg.say("That isn't a valid option.");
			}
		} else {msg.say("You don't have permission for this! (Manage_roles)")}
		
	}
};
