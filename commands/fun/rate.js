const { Command } = require('discord.js-commando');
const index = require('../../index.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rate',
            group: 'fun',
            memberName: 'rate',
            description: 'Rates a thing from 1-10',
            args: [
                {
                    key: "query",
                    prompt: "What would you like to rate?",
                    type: 'string'
                }
            ]
        });
    }

	async run(msg,args) { //Rates an object between 1 and 10.
        if(await index.canInkSpeak(msg.channel.id,msg.guild.id) == false) {msg.react('❌'); return;} //Channel ban check

        const { query } = args;
        var str = query.replace(/[!?,./\\[]]/g,''); //Removes punctuation.
        if(str == "") return msg.say(`I rate **${query}** a straight zero.`); //After removing punctuation, if the query is empty, return this msg.
        str=str.split('').map(x => x.charCodeAt()).reduce((a,b)=>a+b);
        msg.say(`I rate **${query}**... ${str%11}/10.`);
	}
};