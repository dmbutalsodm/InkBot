const { Command } = require('discord.js-commando');
const index = require('../../index.js');
const request = require('request-promise');
const secure = require('../../secure.json')

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'google',
            group: 'search',
            memberName: 'google',
            description: 'Google search for the given query.',
            args: [
                {
                    key: "query",
                    prompt: "What would you like to search for?",
                    type: "string"
                }
            ]
        });
    }

	async run(msg, args) { 
        const { query } = args;
        request({
            uri: `https://www.googleapis.com/customsearch/v1?key=${secure.apiTokens.google}&cx=${secure.apiTokens.google_cx}&q=${query}`,
            json: true
        }).then((response) => {
            let item = response.items[1];
            //console.log(Object.keys(response));
            msg.say(`**${item.title}**\n${item.link}`);
        });
        
    }
};