const sqlite = require('sqlite');

var db;

module.exports = {
	get: () => {
		return db;
	},
	sync: async () => {
		new Promise((resolve, reject) => {
			sqlite.open('./data.sqlite').then(database => {
				db = database;
				resolve(database);
			}).catch((err) => {
				reject(err);
			});
		});
	}
};