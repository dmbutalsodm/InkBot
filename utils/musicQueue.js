const Sequelize = require('sequelize');
const Database  = require('../database.js');
const database  = Database.db

const guildQueue = database.define('guildQueue', {
	guild: {
		type: Sequelize.STRING(20),
		unique: true
	},
	queue: {
		type: Sequelize.TEXT,
	}
});

module.exports = {
	update: async (msg, queue) => {
		await guildQueue.upsert({
			guild: msg.guild.id,
			queue: JSON.stringify(queue)
		});
	},
	get: async (msg) => {
		return await guildQueue.findOrCreate({
			where:{
				guild: msg.guild.id
			},
			defaults: {
				guild: msg.guild.id,
				queue: "[]"
			}
		}).then(queueEntry => {return JSON.parse(queueEntry[0].dataValues.queue)})
	},
	destroy: async (msg) => {
		guildQueue.destroy({
			where: {
				guild: msg.guild.id
			}
		});
	},
	nextSong: async function (msg) {
		let queue = await this.get(msg);
		let song  = queue.splice(0,1);
		this.update(msg, queue);
		return song[0];
	},
	add: async function (msg, song) {
		let queue = await this.get(msg)
		queue.push(song);
		return await this.update(msg, queue);
	}
}
