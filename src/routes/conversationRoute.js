const router = require("express").Router();
const conversation = require("../models/conversation.model");

router.post("/", async (req, res) => {
  const newConversation = new conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const conversations = await conversation.find({
      members: { $in:[req.params.userId] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;