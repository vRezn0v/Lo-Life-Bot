const Sequelize = require('sequelize');


const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const DB = require('./models/servers')(sequelize, Sequelize.DataTypes);
require('./models/reminders')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const DRIVER = [
		DB.upsert( { serverid: 745284560681435229, ownerid: 284153835591696385, serverprefix: '#' } )
	];
	await Promise.all(DRIVER);
	console.log('Database Synced')
	sequelize.close();
}).catch(console.error);