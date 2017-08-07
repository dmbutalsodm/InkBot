const { Command } = require('discord.js-commando');
const secure = require('../../secure.json')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(secure.apiTokens.youtube);
const index = require('../../index.js');

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
	} //The API doesn't give a legit link, only ID, so the link is created and the ID appended.
};