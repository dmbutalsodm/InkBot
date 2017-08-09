const child = require('child_process');
const index = require('../../index.js');
const rp = require('request');
const api = require('genius-api');
const secure = require('../../secure.json');
var genius = new api(secure.apiTokens.genius);


const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'restart',
			group: 'owner',
			memberName: 'restart',
			description: 'Pulls any updates and restarts the bot',
			details: 'Pulls the latest update from github and restarts Ink. Owner only.',
			examples: ['1restart'],
		});    
	}

	async run(msg, args) { //DMs the mentioned user the written content.
		const {user, content} = args;
		if(!this.client.isOwner(msg.author.id)) return msg.say(`This command is only for Lex and dm!`);
        msg.say("I'm dying.");
        child.exec('git pull', (err, stdout, stderr) => { //runs git pull, then runs the callback, which is to exit the process.
            console.log(err);
            console.log(stdout);
            console.log(stderr);
            process.exit(0); //the host will automatically restart the bot.
        });
	}
};