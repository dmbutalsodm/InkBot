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
            details: 'Searches for a sample page of an ink if it\'s in the database',
            format: '<query>',
            examples: ['1inksearch Baystate blue'],
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
        if(typeof(inky) == 'object') return msg.say(`**${inky[0]}**\n${inky[1]}`);
        msg.say(inky);
    }
};