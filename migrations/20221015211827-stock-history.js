'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(async () => {
        await queryInterface.createTable("stock-history", {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
            primaryKey: true,
          },
          type: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          productId: {
            type: Sequelize.INTEGER,
            references: { model: "products", key: "SKU" },
            allowNull: false,
            onDelete: 'cascade'
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          description: {
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
          },
          actionDate: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("stock-history");
  }
};
