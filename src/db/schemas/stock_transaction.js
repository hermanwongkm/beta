const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');
const db = require('../models/index.js');

const { stock_transaction } = db;

const stockTransaction = new GraphQLObjectType({
  name: 'stock_transactions',
  description: 'this represents a stock transction',
  fields: () => {
    return {
      symbol: { type: GraphQLString },
      open_price: { type: GraphQLFloat },
      size: { type: GraphQLInt },
      open_date: { type: GraphQLString },
      close_date: { type: GraphQLString },
      close_price: { type: GraphQLFloat },
    };
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'this is a root query',
  fields: () => {
    return {
      stockTransactions: {
        type: new GraphQLList(stockTransaction),
        args: {},
        async resolve(root, args) {
          const user = await stock_transaction.findAll();
          if (user) {
            return user;
          }
        },
      },
      stockTransaction: {
        type: stockTransaction,
        args: {},
        async resolve(root, args) {
          const user = await stock_transaction.findAll();
          if (user) {
            return user[0];
          }
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({ query: Query });
