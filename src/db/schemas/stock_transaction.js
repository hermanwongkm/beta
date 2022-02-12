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
  // The fields object is used for defining all the fields in a particular type. 
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

//Mutation represents POST, PUT, DELETE requests in REST API.
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      addStockTransaction: {
        type: StockTransactionType,
        args: {
          //This is your input variables
          symbol: { type: GraphQLString },
          openPrice: { type: GraphQLFloat },
          size: { type: GraphQLInt },
          openDate: { type: GraphQLString },
          closeDate: { type: GraphQLString },
          closePrice: { type: GraphQLFloat },
        },
        //root: This is the result of the parent resolver. 
        //args: The arguments or data provided by the graphQL query. This can be seen as the request payload in REST API.
        //context: An object available to all resolvers. Any data that should be globally accessible to all resolvers are placed in the context. For example, we can pass the Sequelize models to the context.
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

// Query represents the GET request in REST API
//The “query” type’s name is “Query” and has 2 field called
//“stockTransactions” and "stockTransaction"
// Each of it has a resolver function that will return whatever you want
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'this is a root query',
  fields: () => {
    return {
      stockTransactions: {
        //each of this is a field
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
        //This is another field
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

//Think of this as a service
//Every GraphQL service defines a set of types which completely
// describe the set of possible data you can query on that service.
//1. GraphQL has the concept of schemas.
// So inside this schema we have the Query and Mutation types.
// Inside the schema, we have a type called “query” which is created using GraphQLObjectType
module.exports = new GraphQLSchema({
  query: Query, //Every schema must have a query type which is created using GraphQLObjectType
  mutation: Mutation,
});
