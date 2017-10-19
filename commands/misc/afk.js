const { Command } = require('discord.js-commando');
const afk = require('../../utils/afk.js');

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'afk',
			aliases: [],
			group: 'misc',
			memberName: 'afk',
			description: 'Marks you as AFK with the reason you provide.',
			details: 'Marks you as AFK with the reason you provide. If you are tagged, a message will be sent stating that you are afk, with your given reason. Putting `--global` in your reason will send your reason on _any_ server you are tagged in.',
            format: '[reason] <--global>',
            examples: ['Yui afk Grinding in BDO.', 'Yui afk', 'Yui afk Be back in a week. --global'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 10
			},
			args: [
				{
					key: "reason",
					prompt: "Why are you going afk?",
					type: 'string',
                    default: 'noreason'
				}
			]
		});
	}

	async run(msg, args) { 	
        let { reason } = args;
		if(await afk.isAFK(msg)) return;
		let global = reason.includes("--global");
		if(global) reason = reason.replace(" --global", "");
		if(reason == "") reason = "noreason";
        afk.goAFK(msg, reason, global);
        msg.say(`⌨ | I've set you as AFK, ${msg.member.displayName}`);
	}
};