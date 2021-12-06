const mongoose = require("mongoose");
const userInfo = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  name: {
    type: String,
    require: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  photoUrl: {
    type: String,
    require: true,
    unique: true
  },
  uid: {
    type: String,
    require: true,
    unique: true
  },
  chatData: {
    type: Object,
    users: {
      type: Object
    }
  }
});

module.exports = mongoose.model('user', userInfo);