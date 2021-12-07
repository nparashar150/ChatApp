const mongoose = require("mongoose");
const messageInfo = new mongoose.Schema(
    {
        consversationId: {
            type: String
        },
        sender: {
            type: String
        },
        text: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('message', messageInfo);