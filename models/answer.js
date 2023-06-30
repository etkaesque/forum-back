const mongoose = require("mongoose");


const answerSchema = mongoose.Schema({
  id: { type: String, required: true},
  date_created:{ type: Date, immutable: true},
  date_edited:{ type: Date, default: () => Date.now()},
  content: { type: String, required: true, min: 3},
  author: { type: String, required: true, min: 3},
  question: { type: Array}, 
  upvotes: { type: Number, default: 0},
  downvotes: { type: Number, default: 0},
  

 
});

module.exports = mongoose.model("Answer", answerSchema);