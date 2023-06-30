const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  id: { type: String, required: true},
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true, lowercase: true},
  password: { type: String, required: true, min: 6 },
  photo:{ type: String, required: false},
  asked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  answered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  likedAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  dislikedAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
 
});

module.exports = mongoose.model("User", userSchema);