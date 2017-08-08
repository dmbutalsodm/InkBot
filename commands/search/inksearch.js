const { Command } = require('discord.js-commando');
const index = require('../../index.js');
const inkFinder = require('../../inks.js');


module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'inksearch',
            group: 'search',
            memberName: 'inksearch',
            description: 'Search for an ink sample.',
            examples: ['inksearch Baystate blue'],
            args: [
                {
                    key: "query",
                    prompt: "What ink would you like to search for?",
                    type: 'string'
                }
            ]
        });
    }

	async run(msg,args) {     
        const { query } = args;
        var inky = await inkFinder.inkSearch(query);
        msg.say(`**${inky[0]}**\n${inky[1]}`);
    }
};