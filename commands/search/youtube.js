const { Command } = require('discord.js-commando');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyDKeY8mQD5p4SVb1jH7zkasxZm8IWB1oK4');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtube',
            group: 'search',
            memberName: 'youtube',
            description: 'Search for a YouTube video.',
            args: [
                {
                    key: "query",
                    prompt: "What would you like to search youtube for?",
                    type: 'string'
                }
            ]
        });
    }

	async run(msg,args) {
        const { query } = args;
        youtube.searchVideos(query,1).then(results => msg.say(`Here's the video I found:\nhttps://www.youtube.com/watch?v=${results[0].id}`)).catch(console.log());
	}
};