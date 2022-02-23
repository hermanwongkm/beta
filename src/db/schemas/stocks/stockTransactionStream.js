const {
  GraphQLList,
} = require('graphql');
const db = require('../../models');
const { reconstructStreamWithArray } = require('./helper');
const {StockTransactionsAggregateType} = require('./types');
const { StockTransactionStream } = db

const StockTransactionStreamSchema = {     
  type: new GraphQLList(StockTransactionsAggregateType),
  args: {},
  async resolve(root, args) {
    const stockTransactionStreams = await StockTransactionStream.findAll({
      include: [
        {
          as: 'stockTransactions',
          model: db.StockTransaction,
        }
      ]
      });
      x = stockTransactionStreams.map(stockTransactionStream => {
        return {
          symbol: stockTransactionStream.type, 
          ...reconstructStreamWithArray(stockTransactionStream.stockTransactions)
        }
      })
      console.log(x)
      return x;
  }
}



module.exports = {StockTransactionStreamSchema}