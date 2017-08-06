const { Command } = require('discord.js-commando');
const index = require('../../index.js');
var striptags = require('striptags');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hey',
            group: 'fun',
            memberName: 'hey',
            description: 'See if Ink is online.'
        });
    }

	async run(msg) { //Returns a random greeting from a pre-determined object.
        var greetings = { 
			0: 'Hello!',
            1: 'Hi!',
            2: 'Hey there!',
            3: 'I\'m here!',
            4: 'Pong!',
            5: 'Hey!',
            6: '안녕하세요!',
            7: 'Yes?',
            8: 'Ready to work!',
            9: `hi person hi hi`,
            10: `Hello jello!`,
            11: "어떻게 지내세요?",
            12: "만나서 반갑습니다",
            13: "안녕하십니까",
            14: "좋은 아침입니다",
            15: "무슨 일이야?",
            16: "모해?",
            17: "야!",
            18: "오랜만이에요.",
		} 
        var random = Math.floor(Math.random() * (Object.keys(greetings).length));
        msg.say(greetings[random]);
        /*var test = (striptags(`{"batchcomplete":"","query":{"pages":{"50717057":{"pageid":50717057,"ns":0,"title":"Lil Uzi Vert","revisions":[{"contentformat":"text/x-wiki","contentmodel":"wikitext","*":"==Career==\nUzi Vert's rapping skills were noticed by [[Don Cannon]], who heard one of Uzi's songs being played on the radio by DJ Diamond Kuts.\n<ref>{{cite web|url=http://noisey.vice.com/read/lil-uzi-vert-noisey-next|title=Lil Uzi Vert is living in the future of rap - Noisey|publisher=}}</ref><ref>{{cite web|url=http://www.xxlmag.com/rap-music/the-break/2015/03/break-presents-lil-uzi-vert/|title=The Break Presents: Lil Uzi Vert - XXL|publisher=}}</ref>  Uzi later signed a record deal with [[DJ Drama]], Don Cannon and Leighton Morrison's record label Generation Now and [[Atlantic Records]].<ref name=\"auto\">{{Cite web|url=http://www.complex.com/music/2016/01/next-wave-meet-lil-uzi-vert-the-next-phenom-in-rap|title=Next Wave: Meet Lil Uzi Vert, the next phenom in rap|website=Complex|access-date=2016-06-04}}</ref> Uzi gained attention after being featured on [[Carnage (DJ)|Carnage]]'s single \"WDYW\" with [[ASAP Ferg]] and [[Rich The Kid]] in 2015.\n\nUzi then released his third mixtape ''[[Luv Is Rage]]'' on December 18, 2015, with productions from Don Cannon, [[FKi (production team)|FKi]], [[Sonny Digital]], [[TM88]], DP Beats, Maaly Raw and more, and guest features from [[Wiz Khalifa]] and [[Young Thug]]. On April 15, 2016, Uzi released his fourth mixtape ''[[Lil Uzi Vert vs. the World]]'' with production from Don Cannon, [[Metro Boomin]], [[WondaGurl]], M-TRAX, Smatt Sertified and more, with the cover art designed by Fvrris.<ref>{{cite web|url=http://www.hotnewhiphop.com/lil-uzi-vert-lil-uzi-vert-vs-the-world-new-mixtape.116368.html|title=Lil Uzi Vert - Lil Uzi Vert. Vs. The World - Download & Listen [New Mixtape]|publisher=}}</ref> He was named as one of the ten 2016 ''[[XXL Magazine|XXL]]'' Freshmen on June 13, 2016.<ref>{{cite web |url=http://www.hotnewhiphop.com/xxl-freshman-class-of-2016-revealed-news.22200.html? |title=XXL Freshman Class 2016 |last=Schwartz |first=Danny |date=June 19, 2016 |website=[[Hotnewhiphop]] |access-date=19 June 2016}}</ref> On July 31, 2016, Uzi released his fifth mixtape ''[[The Perfect Luv Tape]]'' on his 22nd birthday. Similar to his other albums, this one features many famous rappers such as [[Future (rapper)|Future]] in his song \"Seven Million.\" <ref>{{cite web|url=http://www.hotnewhiphop.com/stream-lil-uzi-verts-the-perfect-luv-tape-featuring-future-and-more-news.23182.html|title=Stream Lil Uzi Vert's \"The Perfect Luv Tape,\" Featuring Future & More|publisher=}}</ref>\n\nUzi collaborated with the rap group [[Migos]] in October 2016 on the single \"[[Bad and Boujee]]\" which in January 2017 reached number one on the US [[Billboard Hot 100|''Billboard'' Hot 100]], becoming Uzi Vert's first number one single as a featured artist and his highest charting single.<ref name=\"auto1\"/> On March 24th, 2017, Uzi released the song [[XO TOUR Llif3]] as a single, off of his EP [[Luv Is Rage 1.5]]. The single has since become Uzi's highest charting song as a lead artist, reaching a #7 peak on the Billboard Hot 100."}]}}}}`));
        test = test.replace(/[[\]]+/g,'').replace(/{(.)+}/g,'').replace(/'+/g, `'`);
        console.log(test);*/
	}
};