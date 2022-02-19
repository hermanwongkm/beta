const { GraphQLString } = require('graphql');
const db = require('../../models');
const { StockTransactionsAggregateType} = require('./types');
const { StockTransaction } = db

const calculateAveragePrice = (currAveragePrice, currSize, newPrice, newSize) => {
  const newAveragePrice = (currAveragePrice * currSize + newPrice * newSize) / (currSize + newSize);
  return newAveragePrice;
}

const StockTransactionsAggregateSchema = {     
  type: StockTransactionsAggregateType,
  args: {
    symbol: { type: GraphQLString }
  },
  async resolve(root, args) {
    const stockTransactions = await StockTransaction.findAll({
      order: [['version', 'ASC']],
      raw: true,
      where : {
        symbol: args.symbol
      }
    });
    accumulated = stockTransactions.reduce((accumulate, currentStockTransaction) => {
      if(currentStockTransaction.type === "BUY"){
        accumulate.averagePrice = calculateAveragePrice(accumulate.averagePrice, accumulate.size, currentStockTransaction.price, currentStockTransaction.size);
        accumulate.size += currentStockTransaction.size;
        return accumulate;
      }
      else if(currentStockTransaction.type === "SELL"){ 
        accumulate.size -= currentStockTransaction.size;
        return accumulate;
      }
    },{size: 0, averagePrice: 0});
    
    return {symbol: args.symbol, averagePrice: accumulated.averagePrice, size: accumulated.size};
  }
}

module.exports = {StockTransactionsAggregateSchema}