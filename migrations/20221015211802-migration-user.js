/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(async () => {
        await queryInterface.createTable("users", {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
            primaryKey: true,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastName: {
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
          },
          role: {
            allowNull: false,
            type: Sequelize.STRING
          }
        });
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  }
};
