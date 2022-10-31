'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(async () => {
        await queryInterface.createTable("products", {
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          //Código
          SKU: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
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
          },
          rfId: {
            type: Sequelize.STRING,
            allowNull: false
          },
          //lote
          batchNumber: {
            type: Sequelize.STRING,
            allowNull: false
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true
          }
        });
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  }
};
