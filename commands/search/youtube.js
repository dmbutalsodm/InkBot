const { Command } = require('discord.js-commando');
const secure = require('../../secure.json')
const YouTube = require('youtube-node');
const youtube = new YouTube();
youtube.setKey(secure.apiTokens.youtube);
const index = require('../../index.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtube',
            group: 'search',
            memberName: 'youtube',
            details: 'Searches for a video on YouTube.',
            format: '<query>',
            description: 'Search for a YouTube video.',
            aliases: ['video', 'yt'],
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
        youtube.search(query,1, (e, r) => {
            msg.say(`Here's the video I found:\nhttps://www.youtube.com/watch?v=${r.items[0].id.videoId}`);
        });
	} //The API doesn't give a legit link, only ID, so the link is created and the ID appended.
};