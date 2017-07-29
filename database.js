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
				await db.run("CREATE TABLE IF NOT EXISTS roles (test STRING)");
				resolve(db);
			} catch (ex) {
				reject(ex);
			}
		});
	}
};