'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class add - food - map - locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  add - food - map - locations.init({
    title: DataTypes.STRING,
    something: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'add-food-map-locations',
  });
  return add - food - map - locations;
};