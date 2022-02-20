const db = require('../../models');
const { StockTransaction } = db

const calculateAveragePrice = (currAveragePrice, currSize, newPrice, newSize) => {
  const newAveragePrice = (currAveragePrice * currSize + newPrice * newSize) / (currSize + newSize);
  return newAveragePrice;
}
//Todo:
// 1. handle the case of selling more than you own
//2. retry mechanism for optimistic locking
const reconstructStream = async (symbol) => {
  const stockTransactions = await StockTransaction.findAll({
    order: [['version', 'ASC']],
    raw: true,
    where : {
      symbol: symbol
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

  return {symbol: symbol, averagePrice: accumulated.averagePrice, size: accumulated.size};
}

function roundToTwoDecimal(v) {
  return Math.ceil(v * Math.pow(10, 2)) / Math.pow(10, 2);
}

module.exports = {reconstructStream,roundToTwoDecimal}