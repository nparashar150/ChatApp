const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
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
  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId, 
      text,
    });
  });

  // Remove User on Disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected");
    removeUser(socket.id);
  });
});
