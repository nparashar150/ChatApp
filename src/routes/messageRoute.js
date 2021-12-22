const router = require("express").Router();
const Messages = require("../models/message.model");

router.post("/", async (req, res) => {
  const newMessage = new Messages(req.body);
  try {
    const setMessage = await newMessage.save();
    res.status(200).json(setMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:conversationId", async (req, res) => {
  // console.log(req.params.conversationId);
  try {
    const conversation = await Messages.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
