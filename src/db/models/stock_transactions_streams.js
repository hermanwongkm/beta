'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StockTransactionStream extends Model {
    static associate(models) {}
  }
  StockTransactionStream.init(
    {
      streamId: DataTypes.UUID,
      version: DataTypes.INTEGER,
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'StockTransactionStream',
      tableName: 'stock_transactions_streams',
    },
  );
  StockTransactionStream.associate = (models) =>{
    StockTransactionStream.hasMany(models.StockTransaction, {foreignKey: 'stockStreamId'});
  }

  return StockTransactionStream;
};