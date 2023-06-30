const mongoose = require("mongoose");


const questionSchema = mongoose.Schema({
  id: { type: String, required: true},
  date_created:{ type: Date, immutable: true},
  date_edited:{ type: Date, default: () => Date.now()},
  title: { type: String, required: true, min: 3},
  content: { type: String, required: true, min: 3},
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer"}],


 
});

module.exports = mongoose.model("Question", questionSchema);