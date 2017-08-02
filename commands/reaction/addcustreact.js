/*
var customthings = await db.findAll("Your SQL");
customthings.forEach(thingy => {
    reactionCache.push({
        id: thingy.id,
        user: thingy.user,
        guild: thingy.guild,
        text: thingy.reminder
    });
});
*/
const { Command } = require('discord.js-commando');
const database = require('../../database.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addcustreact',
            group: 'reaction',
            memberName: 'addcustreact',
            description: 'Adds a custom reaction using a trigger and content. Put both the trigger and the phrase in quotes.',
            guildOnly: true,
            args: [
                {
                    key: "trigger",
                    prompt: "What is the trigger for the reaction?",
                    type: 'string'
                },
                {
                    key: "content",
                    prompt: "What should be said in response to the trigger?",
                    type: 'string'
                }
            ]
        });
    }

	async run(msg,args) {
        const { trigger,content } = args;
        var db = database.get();

        var test = await db.all(`SELECT trigger FROM customreactions WHERE guildID='${msg.guild.id}d' AND trigger = '${trigger}'`);
        if(test.length > 0) return msg.say(`There is already a reaction with the trigger **${trigger}**...`);
        db.run(`INSERT INTO customreactions (guildID, trigger, content) VALUES ('${msg.guild.id}d', '${trigger}', '${content}');`);
        return msg.say(`Reaction added, **${trigger}** will cause me to say **${content}**.`);
	}
};