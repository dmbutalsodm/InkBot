const { Command } = require('discord.js-commando');
const database = require('../../database.js');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sublist',
			group: 'roles',
			memberName: 'sublist', 
			description: 'Used to list roles you can subscribe to.',
			details: 'Used to list the roles that are able to be subscribed to in this guild.',
			examples: ['1sublist'],
			guildOnly: true,
		});
	}
	
	async run(msg,args) {
		const { role,list } = args;
		var db = database.get();
		var provider = this.client.provider;
		var roleList = provider.get(msg.guild, 'subableRoles', []); //Gets all the roles that're in the table from this guild as an object.
		roleList = roleList.map((x) => msg.guild.roles.find('id', x).name); //Turns the objects to just an an array with role IDs.
		msg.say(`The roles you can subscribe to in **${msg.guild.name}** are: \`\`\`${roleList.join(", ")}\`\`\``);
	}
};
