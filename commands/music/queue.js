const { Command }      = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const queue            = require('../../utils/musicQueue.js');


module.exports = class GetQueueCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'queue',
			aliases: ['q'],
			group: 'music',
			memberName: 'queue',
			description: 'Displays the queue',
			details: 'Displays the queue',
			examples: ['Yui queue'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
            },
            args: [
                {
                    key: "page",
					prompt: "What page of the queue would you like to view?",
                    type: 'integer',
                    default: "1"
                }
            ],
		});
	}

	async run(msg, args) { 
        const { page } = args;
        let guildQueue = await queue.get(msg);
        if(guildQueue.length < 1) return msg.say("⚠ | There are no songs in the queue.");
        let titles = guildQueue.map((songObject) => {return songObject.title});
        if(titles.join("\n").length > 1000) return this.longQueue(msg, titles, page);
        let formattedArray = ["The current queued up songs are:\n"];
        for(let i = 1;i<titles.length+1;i++) {
            formattedArray.push(`${i}. **${titles[i-1]}**`);
        }
        return msg.say(formattedArray);
    }

    async longQueue(msg, titles, page) {
        if(page > Math.ceil(titles.length/10)) return msg.say("⚠ | That is not a valid page number.")
        let formattedArray = [`Queue page ${page} of ${Math.ceil(titles.length/10)}:\n`];
        for(let i = page*10-9;i<page*10+1;i++) {
            if(titles[i-1]) formattedArray.push(`${i}. **${titles[i-1]}**`);
        }
        return msg.say(formattedArray);
    }
};