'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stock_transactions_snapshots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stockStreamId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {model: 'stock_transactions_streams', key: 'streamId'},
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      symbol: {
        type: Sequelize.STRING
      },
      averagePrice: {
        type: Sequelize.FLOAT
      },
      size: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stock_transactions_snapshots');
  }
};