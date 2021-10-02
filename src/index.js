const express = require( "express" );   
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
      return 'Hello world!';
    },
  };
  
  
const app = express();
const port = 8080; // default port to listen

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world from normal api" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );


