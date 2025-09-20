// models/DSAProblem.js
const mongoose = require('mongoose');

const DSAProblemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemName: { type: String, required: true },
  platform: { type: String, required: true },
  link: { type: String },
  timeComplexity: { type: String },
  spaceComplexity: { type: String }
}, { timestamps: true }); // `timestamps: true` automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('DSAProblem', DSAProblemSchema);
