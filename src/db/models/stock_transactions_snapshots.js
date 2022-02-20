'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StockTransactionSnapshot extends Model {
    static associate(models) {}
  }
  StockTransactionSnapshot.init(
    {
      streamId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      version: DataTypes.INTEGER,
      symbol: DataTypes.STRING,
      averagePrice: DataTypes.FLOAT,
      size: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'StockTransactionSnapshot',
      tableName: 'stock_transactions_snapshots',
    },
  );
  // StockTransactionStream.associate = (models) => {
  //   StockTransactionStream.hasMany(
  //     models.StockTransaction, 
  //     {
  //        as:'stockTransactions',
  //        // This foreign key is merely used to join the table
  //        // So imagine, when you make this query, it will do:
  //        // ON "StockTransactionStream"."streamId" = "stockTransactions"."stockStreamId";
  //        foreignKey: 'stockStreamId',
  //       sourceKey: 'streamId'
  //     }
  //   );
  // }

  return StockTransactionSnapshot;
};