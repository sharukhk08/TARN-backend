const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const routes = require("./routes");

// CONNECT MONGO DB HERE
const DB =
  "mongodb+srv://sharukh:sharukh@cluster0.wuqad.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err, "No connection");
  }); // connect to mongo db

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// HERE WE IMPORTS HERE ALL API ROUTES FROM ROUTER FILE
// const routes = require("./routes/router");

app.use("/api/v1", routes);

// app.get("/api/v1", (req, res) => {
//   res.send("Welcome to Node.js world my First Api!");
//   console.log("Home api run");
// });

app.listen(4000, () => {
  console.log("App listening on port 4000!");
});