import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_URL;
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});


export default socket;