const mongoose = require("mongoose");
const userInfo = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  photoUrl: {
    type: String,
    require: true,
    // unique: true
  },
  photoId: {
    type: String,
    unique: true,
  },
  uid: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("user", userInfo);
