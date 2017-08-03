const sqlite = require('sqlite');

var db;

module.exports = {
	get: () => {
		return db;
	},
	sync: async () => {
		new Promise(async (resolve, reject) => {
			try {
				db = await sqlite.open('./data.sqlite');
				await db.run("CREATE TABLE IF NOT EXISTS roles (guildID STRING, roleID STRING);");
				await db.run("CREATE TABLE IF NOT EXISTS customreactions (guildID STRING, trigger STRING, content STRING);");
				await db.run("CREATE TABLE IF NOT EXISTS channelbans (guildID STRING, channelID STRING);");
				resolve(db);
			} catch (ex) {
				reject(ex);
			}
		});
	},
	customReactionDatabaseSync: async () => {
		var CRA = await db.all(`SELECT * FROM customreactions;`);
		return CRA;
	}
};