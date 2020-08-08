const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./server/schema/index");
const resolver = require("./server/resolver/index")
const app = express();

app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("server is running");
});

app.get("/", (req, res) => {
  res.send("hello hayati");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,

  })
);
