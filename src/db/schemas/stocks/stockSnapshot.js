const { GraphQLString } = require('graphql');
const db = require('../../models');
const { reconstructStream } = require('./helper');
const { StockTransactionsAggregateType} = require('./types');

const StockTransactionsAggregateSchema = {     
  type: StockTransactionsAggregateType,
  args: {
    symbol: { type: GraphQLString }
  },
  async resolve(root, args) {
    return reconstructStream(args.symbol);
  }
}

module.exports = {StockTransactionsAggregateSchema}