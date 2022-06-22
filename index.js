const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const routes = require("./routes");
// CONNECT MONGO DB HERE
const DB =
  "mongodb+srv://sharukh:sharukh@cluster0.wuqad.mongodb.net/task-node-react";

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



  const corsOptions = {
    origin: 'https://task-node-react.herokuapp.com',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
  }
app.use(cors({corsOptions}));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// HERE WE IMPORTS HERE ALL API ROUTES FROM ROUTER FILE

app.use("/api/v1", routes);

// app.get("/api/v1", (req, res) => {
//   res.send("Welcome to Node.js world my First Api!");
//   console.log("Home api run");
// });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App listening on port 4000!");
});