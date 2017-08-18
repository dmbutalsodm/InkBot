const { Command } = require('discord.js-commando');
const index = require('../../index.js');
const rp = require('request');
const api = require('genius-api');
const secure = require('../../secure.json');
var genius = new api(secure.apiTokens.genius);
const lyrics = require('../../standalone.js');
const request = require('request');
const striptags = require('striptags');



module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'line',
            group: 'search',
            memberName: 'line',
            description: 'Grabs a random line from the selected song.',
            details: 'Grabs a random line from the song you provide.',
            format: '<query>',
            examples: ['1line <query>'],
            args: [
                {
                    key: "query",
                    prompt: "What song would you like to grab a line from?",
                    type: 'string'
                }
            ]
        });
    }

	async run(msg,args) {     
        const { query } = args; 
        genius.search(query).then(function(response) {
            var bangbang = response.hits[0].result;
            var url = `https://genius.com${bangbang.path}`
        
            request({
            uri: url,
            }, (error, response, body) => {
                var memes = body;
                memes = striptags(memes);
                var regex = /(\[chorus\]|\[intro\]|\[verse 1\]|\[verse\]|\[pre-chorus\])/i
                if(!memes) return 'There is no internet connection...';
                var prefix = regex.exec(memes);
                memes = memes.replace(/(\[chorus\]|\[intro\]|\[verse 1\]|\[verse\]|\[pre-chorus\])/i, '[STRING TO CUT WITH]')
                .replace('More on Genius', '[STRING TO CUT WITH]')
                .split('[STRING TO CUT WITH]');
                memes = memes[1];
                memes = memes.replace(/\n{3,}|\r{3,}|\s{3,}/g, '');
                memes = memes.replace(/(\[chorus.+]|\[intro\]|\[verse.+]|\[pre-chorus\]|\n\n|\[outro.+])/gi, '');
                var sendBack;
                prefix == null ? sendBack = memes : sendBack = (prefix[1] + memes);
                sendBack = sendBack.split('\n');
                var random = sendBack[Math.floor(Math.random() * sendBack.length)];
                random.length < 200 ? msg.say(`"${random}"`) : msg.say('I didn\'t find a line...');
            });


        }).catch(reason => console.log(reason));
    }
};