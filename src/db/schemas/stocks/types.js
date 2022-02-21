const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} = require('graphql');

const StockTransactionType = new GraphQLObjectType({
  name: 'stock_transaction_type',
  description: 'this represents a stock transction',
  // The fields object is used for defining all the fields in a particular type. 
  fields: () => {
    return {
      symbol: { type: GraphQLString },
      price: { type: GraphQLFloat },
      size: { type: GraphQLInt },
      date: { type: GraphQLString },
      type: { type: GraphQLString },
      profitOrLoss: { type: GraphQLFloat },
      stockTransactionStream: {type:StockTransactionStreamType},
    };
  },
});

const StockTransactionStreamType = new GraphQLObjectType({
  name: 'stock_transaction_stream_type',
  description: 'this represents a stock transction stream',
  fields: () => {
    return {
      streamId: { type: GraphQLString },
      version: { type: GraphQLInt },
      type: { type: GraphQLString },
      stockTransactions: { type:new GraphQLList(StockTransactionType) },
    };
  },
});

const StockTransactionsAggregateType = new GraphQLObjectType({
  name: 'stock_transaction_aggregate_type',
  description: 'this represents a stock transctions averge price for a given stock',
  fields: () => {
    return {
      symbol: { type: GraphQLString },
      averagePrice: { type: GraphQLFloat },
      size: { type: GraphQLInt },
    };
  },
});

module.exports = {StockTransactionType, StockTransactionStreamType, StockTransactionsAggregateType}