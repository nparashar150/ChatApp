require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const userInfo = require("./models/user.model");
const bodyParser = require("body-parser");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
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

  socket.on("newUser", name => {
    user[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
    console.log(name);
  });

  socket.on("userChat", (payload) => {
    io.emit("userChat", payload);
  });
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

app.post("/user/create", async (req, res) => {
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
io.on("connection", (socket) => {
  console.log("New user!");
  socket.on("disconnect", () => {
    console.log("User Disconnected!");
  });
});
app.get("/", (req, res) => {
  res.send("<h1>Root Dir</h1>");
});

server.listen(5000, () => {
  console.log("Listening on *: 5000");
});
