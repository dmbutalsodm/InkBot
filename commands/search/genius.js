const google  = require('google');
const { Command } = require('discord.js-commando');
const index = require('../../index.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'genius',
            group: 'search',
            memberName: 'genius',
            description: 'Search for a song on Genius by title or by lyrics.',
            args: [
                {
                    key: "query",
                    prompt: "What would you like to search Genius for?",
                    type: 'string'
                }
            ]
        });
    }

	async run(msg,args) {        
        const { query } = args;
        google.resultsPerPage = 1 //Grabs only one result from google.
        google(`${query} site:genius.com`, function (err, res){
            if(err) console.error(err)
            msg.say(`Here's what I found:\n${res.links[0].link}`); //Says the the link from the search object.
        });
	}
};