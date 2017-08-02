const { Command } = require('discord.js-commando');
const database = require('../../database.js');


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sublist',
			group: 'roles',
			memberName: 'sublist', 
			description: 'Used to list roles you can subscribe to.',
			examples: ['sublist'],
			guildOnly: true,
		});
	}
	
	async run(msg,args) {
		const { role,list } = args;
		var db = database.get();
		var roleList = await db.all(`SELECT roleID FROM roles WHERE guildID = '${msg.guild.id}d'`); //Gets all the roles that're in the table from this guild as an object.
		roleList = roleList.map((x) => {return x.roleID}); //Turns the objects to just an an array with role IDs.
        roleList = roleList.map((x) => {return msg.guild.roles.get(x.substring(0,x.length-1)).name}); //Turns array of rold IDs to array of role names.
		msg.say(`The roles you can subscribe to in **${msg.guild.name}** are: \`\`\`${roleList.join(", ")}\`\`\``);
	}
};
