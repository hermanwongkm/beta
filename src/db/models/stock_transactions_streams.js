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
      streamId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      version: DataTypes.INTEGER,
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'StockTransactionStream',
      tableName: 'stock_transactions_streams',
    },
  );
  StockTransactionStream.associate = (models) => {
    StockTransactionStream.hasMany(
      models.StockTransaction, 
      {
         as:'stockTransactions',
         // This foreign key is merely used to join the table
         // So imagine, when you make this query, it will do:
         // ON "StockTransactionStream"."streamId" = "stockTransactions"."stockStreamId";
         foreignKey: 'stockStreamId',
        sourceKey: 'streamId'
      }
    );
  }

  return StockTransactionStream;
};