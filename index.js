const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

require("dotenv/config");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const mailRoute = require("./routes/mails");

app.use("/mails", mailRoute);

const conn = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "mails",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connectec to the DB succesfully");
    })
    .catch((err) => {
      console.log(`DB connection err:,${err}`);
    });
};
conn();

app.get("/", (req, res) => {
  res.send("KKTC");
});

app.listen(5000);
