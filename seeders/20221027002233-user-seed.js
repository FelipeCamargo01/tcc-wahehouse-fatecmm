const bcrypt = require("bcryptjs");
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      firstName: 'Warehouse',
      lastName: 'Admin',
      email: 'teste@teste.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: bcrypt.hashSync(process.env.ADMIN_DEFAULT_PASSWORD, 8),
      role: 'admin'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
