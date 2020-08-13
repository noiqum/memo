const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./server/schema/index");
const resolver = require("./server/resolver/index")
const mongoose = require('mongoose');
const connectDB = require("./server/database/db");
const app = express();

app.use(bodyParser.json());



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

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wfytu.mongodb.net/dbmemo?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(4000, () => {
//       console.log("server is running");
//     });
//   })
//   .catch((err) => {
//     console.log(err)
//   })



// const MongoClient = require('mongodb').MongoClient;
// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wfytu.mongodb.net/dbtest?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

connectDB();


app.listen(4000, () => {
  console.log("server is running");
});
