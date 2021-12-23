require("dotenv").config();
const app = require("express")();
const serverless = require("serverless-http");
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const conversationRoute = require("./routes/conversationRoute");
const messageRoute = require("./routes/messageRoute");
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
router.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user/conversation", conversationRoute);
app.use("/user/message", messageRoute);
app.use("/user/create", userRoute);

app.get("/.netlify/functions/server/", (req, res) => {
  res.send("<h1>Root Dir</h1>");
});

// server.listen(5000, () => {
//   console.log("Listening on *: 5000");
// });

app.use("/.netlify/functions/server/user/conversation", conversationRoute);
app.use("/.netlify/functions/server/user/message", messageRoute);
app.use("/.netlify/functions/server/user/create", userRoute);
module.exports.handler = serverless(app);
