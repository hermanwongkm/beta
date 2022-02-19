const {
  GraphQLString,
  GraphQLList,
} = require('graphql');
const db = require('../../models');
const { StockTransactionsAggregateType} = require('./types');
const { StockTransaction } = db

const StockTransactionsAggregateSchema = {     
  type: new GraphQLList(StockTransactionsAggregateType),
  args: {
    symbol: { type: GraphQLString }
  },
  async resolve(root, args) {
    const stockTransactions = await StockTransaction.findAll({
      raw: true,
      where : {
        symbol: args.symbol
      },
    });
    accumulated = stockTransactions.reduce((accumulate, currentStockTransaction) => {
      console.log(currentStockTransaction.size)
      if(currentStockTransaction.type === "BUY"){
        accumulate.size += currentStockTransaction.size;
        accumulate.price += currentStockTransaction.price * currentStockTransaction.size;
        return accumulate;
      }
      else { 
        return accumulate;
      }
    },{size: 0, price: 0});

    console.log(accumulated.price/accumulated.size)
    if (stockTransactions) {
      console.log(stockTransactions);
      return stockTransactions;
    }
  }
}

module.exports = {StockTransactionsAggregateSchema}