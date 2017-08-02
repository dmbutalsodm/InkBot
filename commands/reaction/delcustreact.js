const { Command } = require('discord.js-commando');
const database = require('../../database.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'delcustreact',
            group: 'reaction',
            memberName: 'delcustreact',
            description: 'Deletes a custom reaction by its trigger.',
            guildOnly: true,
            args: [
                {
                    key: "trigger",
                    prompt: "What is the trigger for the reaction you want to delete?",
                    type: 'string'
                }
            ]
        });
    }

	async run(msg,args) {
        const { trigger } = args;
        var db = database.get();
        var test = await db.all(`SELECT trigger FROM customreactions WHERE guildID='${msg.guild.id}d' AND trigger = '${trigger}'`);
        if(test.length == 0) return msg.say(`There are no custom reactions with the trigger **${trigger}**...`);
        db.run(`DELETE FROM customreactions WHERE guildID='${msg.guild.id}d' AND trigger = '${trigger}';`);
        return msg.say(`Reaction deleted, I'll no longer respond to ${trigger}.`);
    }
};