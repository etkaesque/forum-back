const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  id: { type: String, required: true},
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true, lowercase: true},
  password: { type: String, required: true, min: 6 },
  photo:{ type: String, required: false},
  asked: {type: Array},
  answered: {type: Array},
  likedAnswers: {type: Array},
  dislikedAnswers: {type: Array}
 
});

module.exports = mongoose.model("User", userSchema);