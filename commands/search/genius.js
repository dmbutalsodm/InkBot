const google  = require('google');
const { Command } = require('discord.js-commando');

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
        /*var options = {
        query: `${query} site:genius.com`,
        limit: 3
        };
        let i = 0
        scraper.search(options, (err, url) => {
            if(err) return console.log(err);
            if(i==0) msg.say(`Here's what I found:\n${url}`);
            i = 1;
        });
        */
        google.resultsPerPage = 1
        google(`${query} site:genius.com`, function (err, res){
            if(err) console.error(err)
            msg.say(`Here's what I found:\n${res.links[0].link}`);
        });
	}
};