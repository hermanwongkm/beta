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
      openPrice: {
        type: DataTypes.FLOAT,
        field: 'open_price',
      },
      size: DataTypes.INTEGER,
      openDate: {
        type: DataTypes.DATE,
        field: 'open_date',
      },
      closeDate: {
        type: DataTypes.DATE,
        field: 'close_date',
      },
      closePrice: {
        type: DataTypes.FLOAT,
        field: 'close_price',
      },
    },
    {
      sequelize,
      modelName: 'StockTransaction',
      tableName: 'stock_transactions',
    },
  );
  return StockTransaction;
};