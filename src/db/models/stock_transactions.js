'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  stock_transactions.init({
    symbol: DataTypes.STRING,
    open_price: DataTypes.FLOAT,
    size: DataTypes.INTEGER,
    open_date: DataTypes.DATE,
    close_date: DataTypes.DATE,
    close_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'stock_transactions',
  });
  return stock_transactions;
};