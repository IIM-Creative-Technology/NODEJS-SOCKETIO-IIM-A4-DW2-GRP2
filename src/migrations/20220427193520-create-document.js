'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uri: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      creatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          as: 'creatorId',
        }
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('documents');
  }
};