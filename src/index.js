const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./db/schemas/index.js');

const app = express();
const port = 8080; // default port to listen
app.use(
  cors({
    origin: '*',
  }),
);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

// define a route handler for the default home page
app.get('/', async (req, res) => {
    res.send("Hello World");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
