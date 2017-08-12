const { Command } = require('discord.js-commando');
const database = require('../../database.js');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'subable',
			group: 'roles',
			memberName: 'subable', 
			description: 'Used to manage which roles are subscribable.',
			examples: ['1subable add <role name>', '1subable remove <role name>'],
			format: '<option> <role>',
			details: 'This command is used to add or remove roles to the sublist for the guild. Roles on the sublist can be subscribed to with the `sub` command.',
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
		var settingsProvider = this.client.provider;
		if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.say("I don't have permission to manage roles!"); //If Ink cant manage roles message is returned.
		if(!msg.member.hasPermission("MANAGE_ROLES")) return msg.say("You don't have permission to manage roles!"); //If the user can't manage roles, message is returned.
		switch(option.toLowerCase()){
			case "add":
				if(settingsProvider.get(msg.guild, 'subableRoles', []).includes(role.id)) return msg.say("This role is already subscribable!"); //Checks if the role exists in the db.
				let toBePushed = settingsProvider.get(msg.guild, 'subableRoles', []);
				toBePushed.push(role.id);
				settingsProvider.set(msg.guild, 'subableRoles', toBePushed); //In the settings provider, set subableRoles for this guild to equal current subable roles PLUS the new role.
				msg.say(`The role **${role.name}** is now available to subscribe to.`);
				break;
			case "remove": //2 options for removing with fall-through.
			case "delete":
				let toBePushedRemove = settingsProvider.get(msg.guild, 'subableRoles', []);
				toBePushedRemove.splice(toBePushedRemove.indexOf(role.id),1); //Removes the role from the array if it exists, does nothing if it doesn't.
				settingsProvider.set(msg.guild, 'subableRoles', toBePushedRemove); //sets the setting to equal the current array.
				msg.say(`The role **${role.name}** is not able to be subscribed to.`); //Sends this regardless if it exists or not. 
				break;
			default: msg.say("That isn't a valid option.");
		}
	}
};
