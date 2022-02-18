const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');
const {StockTransactionType, StockTransactionStreamType} = require('./types');
const db = require('../../models');
const { sequelize } = require('../../models');


const { StockTransaction, StockTransactionStream } = db

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
    price: { type: GraphQLFloat },
    size: { type: GraphQLInt },
    date: { type: GraphQLString },
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
    console.log(stockTransactionStream)
    console.log(created)

    const stockStream = await StockTransactionStream.findOne({

    });
    //Optimistic locking is used to prevent concurrent updates to the same record.
    //So we will check if the version is the same as the one in the database.
    await sequelize.query(`UPDATE stock_transactions_streams SET version = ${stockStream.version} + 1 WHERE version = '${stockStream.version}' AND id = '${stockStream.id}'`);
    
    const newStockTransaction = await sequelize.query(`INSERT INTO stock_transactions 
    ("symbol", "price", "size", "date", "version", "stockStreamId") VALUES 
    ('${args.symbol}', ${args.price}, ${args.size}, '2021-10-09 08:32:15.639653+00', ${stockStream.version} + 1, '${stockStream.streamId}')`);

    return newStockTransaction;
  },
}


module.exports = {StockTransactionSchema, StockTransactionsSchema, StockTransactionMutationSchema}