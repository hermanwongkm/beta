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
      symbol: DataTypes.STRING,
      price: {
        type: DataTypes.FLOAT,
        field: 'price', // this will map to `price` to `price` just in case you need something else
      },
      size: DataTypes.INTEGER,
      date: DataTypes.DATE,
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'StockTransaction',
      tableName: 'stock_transactions',
    },
  );
  return StockTransaction;
};