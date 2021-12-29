require("dotenv").config();
const express = require("express");
const app = express();
const serverless = require("serverless-http");
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const conversationRoute = require("./routes/conversationRoute");
const messageRoute = require("./routes/messageRoute");
const imageRoute = require("./routes/imageRoute");
const router = require("express").Router();

mongoose.connect(
  process.env.CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("DB connection success!");
    }
  }
);
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};
app.use(cors(corsOptions));
router.use(cors(corsOptions));
app.use(
  bodyParser.urlencoded({ limit: "6mb", extended: true, parameterLimit: 6000 })
);
app.use(bodyParser.json({ limit: "6mb" }));
// app.use("/uploads", express.static("uploads"));
app.use("/user/conversation", conversationRoute);
app.use("/user/message", messageRoute);
app.use("/user/create", userRoute);
app.use("/user/image/upload", imageRoute);

app.get("/.netlify/functions/server/", (req, res) => {
  res.send("<h1>Root Dir</h1>");
});

// server.listen(5000, () => {
//   console.log("Listening on *: 5000");
// });
// app.use("/.netlify/functions/server/user/image/upload/file", express.static("uploads"));
app.use("/.netlify/functions/server/user/conversation", conversationRoute);
app.use("/.netlify/functions/server/user/message", messageRoute);
app.use("/.netlify/functions/server/user/create", userRoute);
app.use("/.netlify/functions/server/user/image/upload", imageRoute);
// app.listen(5000, () => {
//   console.log("server running on 5000");
// });
module.exports.handler = serverless(app);
