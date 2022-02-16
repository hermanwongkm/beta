const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
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
    };
  },
});

module.exports = {StockTransactionType, StockTransactionStreamType}