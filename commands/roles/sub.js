const { Command } = require('discord.js-commando');
const database = require('../../database.js');
const index = require('../../index.js');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sub',
			group: 'roles',
			memberName: 'sub', 
			description: 'Used to subscribe to a role.',
			examples: ['sub [role name]'],
			guildOnly: true,
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
		const { role,list } = args;
		var db = database.get();
		var roleList = await db.all(`SELECT roleID FROM roles WHERE guildID = '${msg.guild.id}d'`); //Grabs all the roles in the db from this guild as an object.
		roleList = roleList.map((x) => {return x.roleID}); //Turns the objects to just an an array with role IDs.
		
		if(!roleList.includes(role.id+'d')) return msg.say(`You cannot subscribe to **${role.name}**!`); //If the role ID is in the array,
		msg.member.addRole(role.id).then(() => { //It's given the the member. 
			return msg.say(`You've subscribed to **${role.name}**.`);
		}).catch((x) => { //If the promise is rejected, since it can only be rejected for permission error, the rejection is handled.
			return msg.say('I don\'t have permission for that!');
		});
	}
};
