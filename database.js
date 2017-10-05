const Sequelize = require('sequelize');
const secure = require('./secure.json');
var database = new Sequelize("settings", "root", "", { 
	logging: false, 
	dialect: 'mysql',
	port: secure.MySQL.port,
	host: "localhost",
	provider: 'mysql'
});

class Database {
	static get db() {
		return database;
	}
	static start() {
		database.authenticate()
			.then(() => console.info('Connection to database has been established successfully.'))
			.then(() => console.info('Synchronizing database...'))
			.then(() => database.sync()
				.then(() => console.info('Synchronizing database done!'))
				.catch(error => console.error(`Error synchronizing the database: ${error}`))
			)
			.then(() => console.log("Connected to database!"))
			.catch(err => console.log(err));
	}
}

module.exports = Database;
