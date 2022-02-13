'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('food_map_locations', 'lat', { type: Sequelize.FLOAT });
    await queryInterface.addColumn('food_map_locations', 'long', { type: Sequelize.FLOAT });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('food_map_locations', 'lat');
    await queryInterface.removeColumn('food_map_locations', 'long');

  }
};
