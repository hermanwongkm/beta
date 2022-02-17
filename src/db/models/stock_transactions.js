
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
      stockStreamId: DataTypes.UUID,
      version: DataTypes.INTEGER,
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
    StockTransaction.associate = (models) => {
      StockTransaction.belongsTo(models.StockTransactionStream,
         {
            as: 'stockTransactionStream',
            foreignKey: 'stockStreamId',
            targetKey: 'streamId'
          }
      );
         //Targetkey is the name of the key this foreign key refers. By default,
         //it is the primary key, hence we need to specify it
         //I added a as because by default it takes the objectName which is capitalized
    }

  return StockTransaction;
};