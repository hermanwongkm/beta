const express = require( "express" );   
const { graphqlHTTP } = require('express-graphql');

const db = require('./db/models/index.js');
const schema = require('./db/schemas/stock_transaction.js');
const { StockTransaction } = db;

const app = express();
const port = 8080; // default port to listen

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

// define a route handler for the default home page
app.get('/', async (req, res) => {
  const user = await StockTransaction.findAll();
  console.log(user);
  if (user) {
    res.send(user[0]);
  }
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );


