require("dotenv").config();
const express = require('express')
const cors = require("cors");
const app = express()
const questionRouter = require("./routes/question.js")
const answerRouter = require("./routes/answer.js")
const userRouter = require("./routes/user.js")
const mongoose = require('mongoose')

app.use(cors({
  origin: 'http://localhost:3000' // Replace with your domain
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 


mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.log("Failed to connect to database.", error);
  });


app.use(questionRouter)
app.use(answerRouter)
app.use(userRouter)
app.listen(process.env.PORT, () => {
    console.log(`Server is running.`)
  })