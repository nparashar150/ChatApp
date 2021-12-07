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

router.get("/:consversationId", async (req, res) => {
  try {
    const conversation = await Messages.find({
      consversationId: req.params.consversationId,
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
