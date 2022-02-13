'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodMapLocation extends Model {
    static associate(models) {}
  }
  FoodMapLocation.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      rating: DataTypes.STRING,
    
    },
    {
      sequelize,
      modelName: 'FoodMapLocation',
      tableName: 'food_map_locations',
    },
  );
  return FoodMapLocation;
};