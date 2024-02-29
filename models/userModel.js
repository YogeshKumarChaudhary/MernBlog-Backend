const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
