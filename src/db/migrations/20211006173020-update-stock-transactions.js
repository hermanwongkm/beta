'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('stock_transactions', 'profitOrLoss', {
      type: Sequelize.FLOAT,
      allowNull: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('stock_transactions', 'profitOrLoss');
  }
};