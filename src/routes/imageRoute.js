const router = require("express").Router();
const {
  uploadFile,
  generatePublicUrl,
} = require("../middlewares/googleDriveHandler");
// const imageInfo = require("../models/image.model");
// const upload = require("../middlewares/imageUpload");

// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     if (!(req.body.email && req.file)) {
//       res.send({ status: 400, message: "Incomplete Information" });
//     }
//     let imageData = new imageInfo({
//       email: req.body.email,
//     });
//     if (req.file) {
//       imageData.image = req.file.path;
//     }
//     const exists = false;
//     if (exists) {
//       res.send({ status: 400, message: "The image already exists" });
//     } else {
//       const saveImage = await imageData.save();
//       res
//         .status(200)
//         .json({
//           saveImage,
//           url: `/.netlify/functions/server/user/image/upload/file/${saveImage.image.replace(
//             "uploads/",
//             ""
//           )}`,
//         });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/getPhotoURL", async (req, res) => {
  try {
    const { base64, mimeType, fileName } = req.body;
    if (base64 && mimeType && fileName) {
      let response = await uploadFile(base64, mimeType, fileName);
      // console.log(response);
      let publicURL = await generatePublicUrl(response.data.id);
      res
        .status(200)
        .json({ uploadStatus: response.data, URL: publicURL.data });
    } else {
      res.status(400).json({ message: "Incomplete Data" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error:"+err });
  }
});
module.exports = router;
