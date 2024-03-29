const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
