const mongoose = require("mongoose");
const imageInfo = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userImage", imageInfo);
