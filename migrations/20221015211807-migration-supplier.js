'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(async () => {
        await queryInterface.createTable("suppliers", {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          address: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("suppliers");
  }
};
