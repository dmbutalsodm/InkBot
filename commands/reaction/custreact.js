const { Command } = require('discord.js-commando');
const database    = require('../../database.js');
const index       = require('../../index.js');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'custreact',
			group: 'reaction',
			memberName: 'custreact',
			description: 'Adds a custom reaction using a trigger and content. Put both the trigger and the phrase in quotes.',
			guildOnly: true,
			args: [
				{
					key: 'option',
					prompt: 'Would you like to add or remove a subscribable role?',
					type: 'string'
				},
				{
					key: "trigger",
					prompt: "What is the trigger for the reaction?",
					type: 'string',
					default: ''
				},
				{
					key: "content",
					prompt: "What should be said in response to the trigger?",
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg,args) {
		const { option,trigger,content } = args;
		var db = database.get();

		switch(option.toLowerCase()){
				case "add":
					if(content == ''  || trigger == '') return msg.say("Your reaction content can't be empty...");
					var test = await db.all(`SELECT trigger FROM customreactions WHERE guildID='${msg.guild.id}d' AND trigger = '${trigger}'`);
					if(test.length > 0) return msg.say(`There is already a reaction with the trigger **${trigger}**...`);
					db.run(`INSERT INTO customreactions (guildID, trigger, content) VALUES ('${msg.guild.id}d', '${trigger}', '${content}');`);
					index.customReactionsArrayPush({
						guildID: `${msg.guild.id}d`,
						trigger: `${trigger}`,
						content: `${content}`
					});
					return msg.say(`Reaction added, **${trigger}** will cause me to say **${content}**.`);
					break;

				case "remove":
				case "delete":
				case    "del":
					var test = await db.all(`SELECT trigger FROM customreactions WHERE guildID='${msg.guild.id}d' AND trigger = '${trigger}'`);
					if(test.length == 0) return msg.say(`There are no custom reactions with the trigger **${trigger}**...`);
					db.run(`DELETE FROM customreactions WHERE guildID='${msg.guild.id}d' AND trigger = '${trigger}';`);
					msg.say(`Reaction deleted, I'll no longer respond to ${trigger}.`);
					return index.rebuildCustomReactionsArray();
					break;
				case   "list":
					var triggerArrayOfObjects = await db.all(`SELECT trigger FROM customreactions WHERE guildID='${msg.guild.id}d'`);
					var triggerArray = []
					triggerArrayOfObjects.forEach((x) => {triggerArray.push(x.trigger)});
					if(triggerArray.length == 0) return msg.say(`There are no custom reaction triggers in **${msg.guild.name}**.`); 
					msg.say(`The list of custom reaction triggers in **${msg.guild.name}** are: \n\`\`\`${triggerArray.join(", ")}\`\`\``);
					break;
				default: msg.say("That isn't a valid option."); break;
		}
	}
};