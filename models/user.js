const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: {
    default: 0,
    type: Number,
  },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
