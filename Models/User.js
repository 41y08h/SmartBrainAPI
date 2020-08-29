const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 61,
  },
  email: {
    type: String,
    required: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 200,
  },
  submissions: {
    type: Number,
    default: 0,
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("User", schema);
