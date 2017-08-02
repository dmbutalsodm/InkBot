const { Command } = require('discord.js-commando');
module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'onlygoodsong',
			group: 'fun',
			memberName: 'onlygoodsong',
			description: 'Gives you options with which to listen to the only good song there is.',
			examples: ['onlygoodsong']
		});
	}

async run(msg) { //Youtube, Spotify, and Genius links for XO TOUR Llif3
		return msg.say(`Here you go! \n`+
		`<https://www.youtube.com/watch?v=Zgmvg-zzctI> \n`+
		`<https://open.spotify.com/track/2eMwDehkIC1j68U6FA3Eiq>\n`+
		`<https://genius.com/Lil-uzi-vert-xo-tour-llif3-lyrics>`); //.say automatically says in the correct channel, the one the command was run from
	}
};