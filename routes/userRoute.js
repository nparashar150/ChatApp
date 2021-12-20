const router = require("express").Router();
const userInfo = require("../models/user.model");

router.post("/", async (req, res) => {
  try {
    const { email, name, photoUrl, uid } = req.body;
    if (!(email && name && photoUrl && uid)) {
      res.send({ status: 400, message: "Incomplete Information" });
    }
    const exists = await userInfo.findOne({ uid: `${uid}` });
    if (exists) {
      res.send({ status: 400, message: "The user already exists" });
    } else {
      const createUser = await userInfo.create({
        email,
        name,
        photoUrl,
        uid,
      });
      res.json(createUser).send({ status: 201, message: "New User created" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:userId", async (req, res) => {
    const users = await userInfo.find({uid: req.params.userId});
    res.json(users);
});

router.get("/all/:queryUserEmail", async (req, res) => {
  const userEmail = await userInfo.find({email: req.params.queryUserEmail});
  res.json(userEmail);
});

module.exports = router;