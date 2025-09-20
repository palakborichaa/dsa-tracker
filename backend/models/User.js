// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // You can keep problemsSolved and attempted if you plan to use them
  // problemsSolved: [{ type: String }],
  // attempted: [{ type: String }]
});

module.exports = mongoose.model('User', UserSchema);
