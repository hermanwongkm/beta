const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');
const db = require('../../models');

const { StockTransaction } = db

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

const StockTransactionSchema = {     
  type: new GraphQLList(StockTransactionType),
  args: {},
  async resolve(root, args) {
    const user = await StockTransaction.findAll({
      //Raw does not work as it converts it into a string, but we need it as a JSON
      nested: true,
      include: [
        {
          as: 'stockTransactionStream',
          model: db.StockTransactionStream,
        }
      ]
    });
    if (user) {
      return user;
    }
  }
}

const StockTransactionsSchema = {     
  //each of this is a field
  type: new GraphQLList(StockTransactionType),
  args: {},
  async resolve(root, args) {
    const user = await StockTransaction.findAll();
    if (user) {
      return user;
    }
  }
}

const StockTransactionMutationSchema = {
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
}


module.exports = {StockTransactionSchema, StockTransactionsSchema, StockTransactionMutationSchema}