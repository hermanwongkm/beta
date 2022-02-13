const {
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');
const { 
  StockTransactionSchema,
  StockTransactionsSchema,
  StockTransactionMutationSchema,
} = require('./stocks/index.js');
const { 
  FoodMapLocationsSchema,
  FoodMapLocationMutationSchema
} = require('./foodMap/index.js');

//Mutation represents POST, PUT, DELETE requests in REST API.
const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      addStockTransaction: StockTransactionMutationSchema,
      addFoodMapLocation: FoodMapLocationMutationSchema,
    };
  },
});


// Query represents the GET request in REST API
//The “query” type’s name is “Query” and has 2 field called
//“stockTransactions” and "stockTransaction"
// Each of it has a resolver function that will return whatever you want
const rootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'this is a root query',
  fields: () => {
    return {
      stockTransactions: StockTransactionsSchema,
      stockTransaction: StockTransactionSchema,
      foodMapLocations: FoodMapLocationsSchema,
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
  query: rootQuery, //Every schema must have a query type which is created using GraphQLObjectType
  mutation: rootMutation,
});
