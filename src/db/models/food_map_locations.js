'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockTransaction extends Model {
    static associate(models) {}
  }
  StockTransaction.init(
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
  return StockTransaction;
};