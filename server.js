require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const conversationRoute = require("./routes/conversationRoute");
const messageRoute = require("./routes/messageRoute");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});
io.on("connection", (socket) => {
  console.log("Socket is active!");

  socket.on("newUser", (name) => {
    user[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
    console.log(name);
  });

  socket.on("userChat", (payload) => {
    io.emit("userChat", payload);
  });
});

io.on("connection", (socket) => {
  console.log("New user!");
  socket.on("disconnect", () => {
    console.log("User Disconnected!");
  });
});
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

app.get("/", (req, res) => {
  res.send("<h1>Root Dir</h1>");
});

server.listen(5000, () => {
  console.log("Listening on *: 5000");
});
