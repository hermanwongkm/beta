const {
  GraphQLList,
} = require('graphql');
const db = require('../../models');
const {StockTransactionStreamType} = require('./types');
const { StockTransactionStream } = db

const StockTransactionStreamSchema = {     
  type: new GraphQLList(StockTransactionStreamType),
  args: {},
  async resolve(root, args) {
    const user = await StockTransactionStream.findAll({
      include: [
        {
          as: 'stockTransactions',
          model: db.StockTransaction,
        }
      ]
      });
    if (user) {
      return user;
    }
  }
}

module.exports = {StockTransactionStreamSchema}