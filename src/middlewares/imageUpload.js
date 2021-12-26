const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      callback(null, true);
    } else {
      conosle.log("image/png , image/jpg, image/jpeg supported");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
});

module.exports = upload;