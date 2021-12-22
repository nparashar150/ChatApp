const mongoose = require("mongoose");
const conversationInfo = new mongoose.Schema(
    {
        members: {
            type: Array,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('conversation', conversationInfo);