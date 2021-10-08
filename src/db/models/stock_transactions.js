'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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