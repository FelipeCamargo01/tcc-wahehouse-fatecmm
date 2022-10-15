const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: false
    },
    models: [__dirname + '/models'],
    pool: {
        max: 10,
        min: 2,
        idle: 1000
    }
})

module.exports = connection;