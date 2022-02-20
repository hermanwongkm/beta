const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

const {StockTransactionType } = require('./types');
const { reconstructStream, roundToTwoDecimal } = require('./helper');

const db = require('../../models');
const { StockTransaction, StockTransactionStream } = db

const StockTransactionSchema = {     
  type: new GraphQLList(StockTransactionType),
  args: {},
  async resolve(root, args) {
    const stockTransaction = await StockTransaction.findAll({
      //Raw does not work as it converts it into a string, but we need it as a JSON
      nested: true,
      include: [
        {
          as: 'stockTransactionStream',
          model: db.StockTransactionStream,
        }
      ]
    });
    if (stockTransaction) {
      return stockTransaction;
    }
  }
}

const StockTransactionsSchema = {     
  //each of this is a field
  type: new GraphQLList(StockTransactionType),
  args: {},
  async resolve(root, args) {
    const stockTransactions = await StockTransaction.findAll();
    if (stockTransactions) {
      return stockTransactions;
    }
  }
}

const StockTransactionMutationSchema = {
  type: StockTransactionType,
  args: { //This is your input variables
    symbol: { type: GraphQLString },
    price: { type: GraphQLFloat },
    size: { type: GraphQLInt },
    date: { type: GraphQLString },
    type: { type: GraphQLString },
  },
  //root: This is the result of the parent resolver. 
  //args: The arguments or data provided by the graphQL query. This can be seen as the request payload in REST API.
  //context: An object available to all resolvers. Any data that should be globally accessible to all resolvers are placed in the context. For example, we can pass the Sequelize models to the context.
  async resolve(root, args) {
    const [stockTransactionStream, created] = await StockTransactionStream.findOrCreate({
      where: { type: args.symbol},
      defaults: {
        type: args.symbol,
        version: 1,
      }
    });
    if(!created) { //If the stream existed previously
        await stockTransactionStream.update({
          version: stockTransactionStream.version + 1,
        },{
          //Optimistic locking is used to prevent concurrent updates to the same record.
        //So we will check if the version is the same as the one in the database.
        where: { version: stockTransactionStream.version}
      });
    }
    let profitOrLoss = null;
    if(args.type === "SELL"){
      const {averagePrice} = await reconstructStream(args.symbol);
       profitOrLoss = args.price - averagePrice;
    }
      const stockTransaction = await StockTransaction.create({
      type: args.type,
      symbol: args.symbol,
      price: args.price,
      size: args.size,
      date: args.date,
      profitOrLoss: roundToTwoDecimal(profitOrLoss),
      version: stockTransactionStream.version,
      stockStreamId: stockTransactionStream.streamId,
    });
    return stockTransaction;
  },
}

module.exports = {StockTransactionSchema, StockTransactionsSchema, StockTransactionMutationSchema}