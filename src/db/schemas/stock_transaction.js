const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');
const db = require('../models/index.js');

const { StockTransaction } = db;

const StockTransactionType = new GraphQLObjectType({
  name: 'stock_transactions',
  description: 'this represents a stock transction',
  fields: () => {
    return {
      symbol: { type: GraphQLString },
      openPrice: { type: GraphQLFloat },
      size: { type: GraphQLInt },
      openDate: { type: GraphQLString },
      closeDate: { type: GraphQLString },
      closePrice: { type: GraphQLFloat },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      addStockTransaction: {
        type: StockTransactionType,
        args: {
          symbol: { type: GraphQLString },
          openPrice: { type: GraphQLFloat },
          size: { type: GraphQLInt },
          openDate: { type: GraphQLString },
          closeDate: { type: GraphQLString },
          closePrice: { type: GraphQLFloat },
        },
        async resolve(root, args) {
          const newStockTransaction = await StockTransaction.create({
            symbol: args.symbol,
            openPrice: args.openPrice,
            size: args.size,
            openDate: '2021-10-09 08:32:15.639653+00',
            closeDate: '2021-10-09 08:32:15.639653+00',
            closePrice: args.closePrice,
          });
          return newStockTransaction;
        },
      },
    };
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'this is a root query',
  fields: () => {
    return {
      stockTransactions: {
        type: new GraphQLList(StockTransactionType),
        args: {},
        async resolve(root, args) {
          const user = await StockTransaction.findAll();
          if (user) {
            return user;
          }
        },
      },
      stockTransaction: {
        type: StockTransactionType,
        args: {},
        async resolve(root, args) {
          const user = await StockTransaction.findAll();
          if (user) {
            return user[0];
          }
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
