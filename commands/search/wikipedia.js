const { Command } = require('discord.js-commando');
const index = require('../../index.js');
const request = require('request-promise');
const secure = require('../../secure.json')

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wikipedia',
            group: 'search',
            memberName: 'wikipedia',
            description: 'Grab a wikipedia article for the given query.',
            args: [
                {
                    key: "query",
                    prompt: "What would you like to search Wikipedia for?",
                    type: "string"
                }
            ]
        });
    }

	async run(msg, args) { 
        const { query } = args;
        request({
            uri: `https://www.googleapis.com/customsearch/v1?key=${secure.apiTokens.google}&cx=${secure.apiTokens.google_wikipedia_cx}&q=${query}`,
            json: true
        }).then((response) => {
            let item = response.items[0];
            msg.say(`**${item.title}**\n${item.link}`);
        });
        
    }
};