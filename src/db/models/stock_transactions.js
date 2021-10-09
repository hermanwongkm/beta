'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_transaction extends Model {
    static associate(models) {}
  }
  stock_transaction.init(
    {
      symbol: DataTypes.STRING,
      open_price: DataTypes.FLOAT,
      size: DataTypes.INTEGER,
      open_date: DataTypes.DATE,
      close_date: DataTypes.DATE,
      close_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'stock_transaction',
      tableName: 'stock_transactions',
    },
  );
  return stock_transaction;
};