
const express = require('express')
const app = express()
var cors = require("cors");
const bodyParser = require("body-parser");
const questionRouter = require("./routes/question.js")
const answerRouter = require("./routes/answer.js")
const userRouter = require("./routes/user.js")
const mongoose = require('mongoose')
require("dotenv").config();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




app.use(questionRouter)
app.use(answerRouter)
app.use(userRouter)


mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.log("Failed to connect to database.", error);
  });


app.listen(process.env.PORT, () => {
    console.log(`Server is running.`)
  })