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
					default: '' //Default empty arguments for trigger and content, so list doesn't ask for additional arguments.
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
					if(content == ''  || trigger == '') return msg.say("Your reaction content can't be empty..."); //Because of default arguments, detecting an empty trigger or content when adding is necessary.
					var testIfCustomReactionExists = await db.all(`SELECT trigger FROM customreactions WHERE guildID='${msg.guild.id}d' AND trigger = '${trigger}'`); // This line and the next are to test if a trigger already exists in the database.
					if(testIfCustomReactionExists.length > 0) return msg.say(`There is already a reaction with the trigger **${trigger}**...`);
					db.run(`INSERT INTO customreactions (guildID, trigger, content) VALUES ('${msg.guild.id}d', '${trigger}', '${content}');`); //If the trigger doesn't exist, the custom reaction is added to the db.
					index.customReactionsArrayPush({ //Function imported from index.js, adds object to the CACHE.
						guildID: `${msg.guild.id}d`,
						trigger: `${trigger}`, 
						content: `${content}`
					});
					return msg.say(`Reaction added, **${trigger}** will cause me to say **${content}**.`);
					break;

				case "remove": //3 acceptable options to delete using fall-through.
				case "delete":
				case    "del":
					var testIfCustomReactionExists = await db.all(`SELECT trigger FROM customreactions WHERE guildID='${msg.guild.id}d' AND trigger = '${trigger}'`); //Sees if the trigger exists in the db.
					if(testIfCustomReactionExists.length == 0) return msg.say(`There are no custom reactions with the trigger **${trigger}**...`); //Does not exist.
					db.run(`DELETE FROM customreactions WHERE guildID='${msg.guild.id}d' AND trigger = '${trigger}';`); //If it does exist, the row is deleted.
					msg.say(`Reaction deleted, I'll no longer respond to ${trigger}.`);
					return index.rebuildCustomReactionsArray(); //Function from index.js, tells it to build the cache again from the database.
					break;
				case   "list": //Lists the triggers in the guild.
					var triggerArrayOfObjects = await db.all(`SELECT trigger FROM customreactions WHERE guildID='${msg.guild.id}d'`); //This is bad, redo. These 3 lines grab the all the triggers in this guild, and put them in an array.
					var triggerArray = [] 
					triggerArrayOfObjects.forEach((x) => {triggerArray.push(x.trigger)});
					if(triggerArray.length == 0) return msg.say(`There are no custom reaction triggers in **${msg.guild.name}**.`); //No triggers response.
					msg.say(`The list of custom reaction triggers in **${msg.guild.name}** are: \n\`\`\`${triggerArray.join(", ")}\`\`\``); //Triggers response.
					break;
				default: msg.say("That isn't a valid option."); break; 
		}
	}
};