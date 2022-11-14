const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
<<<<<<< HEAD
        ssl: {
         require: true,
         rejectUnauthorized: false
=======
    ssl: {
        require: true,
        rejectUnauthorized: false
>>>>>>> d55acb444b5b2c8ed61738ffb30664b00e2f8f80
      }
    },
    models: [__dirname + '/models'],
    pool: {
        max: 10,
        min: 2,
        idle: 1000
    }
})

module.exports = connection;
