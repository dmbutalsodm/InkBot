const { Command } = require('discord.js-commando');
const index = require('../../index.js');
const rp = require('request');
const api = require('genius-api');
const secure = require('../../secure.json');
var genius = new api(secure.apiTokens.genius);


module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'genius',
            group: 'search',
            memberName: 'genius',
            description: 'Search for a song on Genius.',
            args: [
                {
                    key: "query",
                    prompt: "What song would you like to search Genius for?",
                    type: 'string'
                }
            ]
        });
    }

	async run(msg,args) {     
        const { query } = args; 
        genius.search(query).then(function(response) {
            var bangbang = response.hits[0].result;
            msg.say(`${bangbang.full_title}:\nhttps://genius.com${bangbang.path}`);
        }).catch(reason => console.log(reason));
    }
};