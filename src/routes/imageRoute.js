const router = require("express").Router();
const imageInfo = require("../models/image.model");
const upload = require("../middlewares/imageUpload");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!(req.body.email && req.file)) {
      res.send({ status: 400, message: "Incomplete Information" });
    }
    let imageData = new imageInfo({
      email: req.body.email,
    });
    if (req.file) {
      imageData.image = req.file.path;
    }
    const exists = false;
    if (exists) {
      res.send({ status: 400, message: "The image already exists" });
    } else {
      const saveImage = await imageData.save();
      res.status(200).json({saveImage, url: `/.netlify/functions/server/user/image/upload/file/${saveImage.image.replace("uploads/", "")}`});
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:email", async (req, res) => {
  const image = await imageInfo.find({ email: req.params.email });
  res.json(image);
});

module.exports = router;
