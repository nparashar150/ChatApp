const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // On Connection
  console.log("User Connected");

  // Get User.UID from Client
  socket.on("sendUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Chatting Handle
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // Remove User on Disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(8000, () => {
  console.log("Socket Server Started!");
})