const { Command } = require('discord.js-commando');
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'funfact',
            group: 'fun',
            memberName: 'funfact',
            description: 'Have you heard this fact before?',
            examples: ['funfact']
        });
    }

async run(msg) {
        return msg.say(`Fun fact: Kim Jong-un's name is "Jong-un" \nHis last name is "Kim" \nIf he were in America is would be written as "Jong-un Kim"`); //.say automatically says in the correct channel, the one the command was run from
    }
};