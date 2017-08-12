const { Command } = require('discord.js-commando');
const database    = require('../../database.js');
const index       = require('../../index.js');


module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'custreact',
			group: 'misc',
			memberName: 'custreact',
			description: 'Adds a custom reaction using a trigger and content.',
			details: 'Command for custom reactions. For a given input, the bot will say a given output. Use `add` with content and a trigger, remove and a trigger, or list.\nPut both the trigger and content in quotes.',
			guildOnly: true,
			format: `<add/remove/list> "<trigger>" "<content>"`,
			examples: [`1custreact add "Baystate blue" "Is the best ink available"`, `1custreact remove "Baystate blue"`, `1custreact list`],
			args: [
				{
					key: 'option',
					prompt: 'Would you like to add or remove a custom reaction, or list available ones?',
					type: 'string',
					default: ''
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
		const { option, trigger, content } = args;
		var provider = this.client.provider;
		if(option == '') return msg.say("You must select an option...");
		switch(option.toLowerCase()){ 
				case "add":
					if(trigger == '' || content == '') return msg.say("Your reaction content can't be empty..."); //Because of default arguments, detecting an empty trigger or content when adding is necessary.
					var testIfCustomReactionExists = provider.get(msg.guild, 'customReactions', []).find((x) => {if(x.trigger == trigger) return x}); //if a reaction with the trigger exists already in this guild,
					if(testIfCustomReactionExists) return msg.say(`There is already a reaction with the trigger **${trigger}**...`); //return the error
					var toBePushed = provider.get(msg.guild, 'customReactions', []);
					toBePushed.push({
						trigger: trigger,
						content: content
					});
					provider.set(msg.guild, 'customReactions', toBePushed);
					return msg.say(`Reaction added, **${trigger}** will cause me to say **${content}**.`);
					break;

				case "remove": //3 acceptable options to delete using fall-through.
				case "delete":
				case    "del":
					var testIfCustomReactionExists = provider.get(msg.guild, 'customReactions', []).find((x) => {if(x.trigger == trigger) return x}); //if a reaction with the trigger exists already in this guild,
					if(!testIfCustomReactionExists) return msg.say(`There are no custom reactions with the trigger **${trigger}**...`); //Does not exist.
					var toBePushedDelete = provider.get(msg.guild, 'customReactions', []); //gets all the custom reactions for this guild
					var toDelete = toBePushedDelete.find((x) => {if(x.trigger == trigger) return x}); //This finds the object that has to be deleted from the custreactions
					toBePushedDelete.splice(toBePushedDelete.indexOf(toDelete),1); //deletes the object
					provider.set(msg.guild, 'customReactions', toBePushedDelete); //re-sets the custom reactions array
					msg.say(`Reaction deleted, I'll no longer respond to **${trigger}**.`);
					break;
				case   "list": //Lists the triggers in the guild.
					var triggerArrayOfObjects = provider.get(msg.guild, 'customReactions', []); //These 3 lines grab the all the triggers in this guild, and put them in an array.
					var triggerArray = [] 
					triggerArrayOfObjects.forEach((x) => {triggerArray.push(x.trigger)});
					if(triggerArray.length == 0) return msg.say(`There are no custom reaction triggers in **${msg.guild.name}**.`); //No triggers response.
					msg.say(`The list of custom reaction triggers in **${msg.guild.name}** are: \n\`\`\`${triggerArray.join(", ")}\`\`\``); //Triggers response.
					break;
				default: msg.say("That isn't a valid option."); break; 
		}
	}
};