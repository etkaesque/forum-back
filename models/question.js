const mongoose = require("mongoose");


const questionSchema = mongoose.Schema({
  id: { type: String, required: true},
  date_created:{ type: Date},
  date_edited:{ type: Date, default: () => Date.now()},
  title: { type: String, required: true, min: 3},
  content: { type: String, required: true, min: 3},
  author: { type: Object},
  authorIdObect: { type: mongoose.SchemaTypes.ObjectId, ref: "User"},
  answers: {type: Array},


 
});

module.exports = mongoose.model("Question", questionSchema);