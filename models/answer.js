const mongoose = require("mongoose");


const answerSchema = mongoose.Schema({
  id: { type: String, required: true},
  date_created:{ type: Date, immutable: true},
  date_edited:{ type: Date, default: () => Date.now()},
  content: { type: String, required: true, min: 3},
  author: { type: Object},
  question_id: { type: String}, 
  upvoted_by: { type: Array},
  downvoted_by: { type: Array},
  

 
});

module.exports = mongoose.model("Answer", answerSchema);