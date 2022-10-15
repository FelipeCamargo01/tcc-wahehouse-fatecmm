'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(async () => {
        await queryInterface.createTable("products", {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          SKU: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
          },
          supplierId: {
            type: Sequelize.UUID,
            references: { model: "suppliers", key: "id" },
            allowNull: false,
            onDelete: 'cascade'
          },
          productImage: {
            type: Sequelize.STRING,
            allowNull: true,
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
    await queryInterface.dropTable("products");
  }
};
