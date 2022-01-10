import { useState, useEffect } from "react";
import axios from "axios";
import { backendBaseURL } from "../../firebase";
import {
  MessageItemUser,
  MessageInfo,
  MessageItemName,
  MessageData,
  MessageItem,
} from "../Shared/UserImage/UserImage";

export default function Conversation({
  showUserInfo,
  currentUser,
  onlineUsers,
  currentUserData,
  id,
  keyValue,
}) {
  let [user, setUser] = useState({});
  let [messages, setMessages] = useState([]);
  let [currentChat, setCurrentChat] = useState(null);
  let [isOnline, setIsOnline] = useState(false);

  const showUserData = () => {
    let chat = [];
    currentUserData({
      name: user?.name,
      img: user?.photoUrl,
      chatData: chat,
      uid: user?.uid,
      chatId: id,
      keyValue,
    });
    messages.forEach((e) => {
      chat.push(e);
    });
    setCurrentChat(id);
  };

  useEffect(() => {
    let isComponentMounted = true;
    const checkOnline = (userId) => {
      onlineUsers.forEach((element, index) => {
        if (
          onlineUsers[index].userId === user?.uid ||
          onlineUsers[index].userId === userId
        ) {
          if (isComponentMounted) {
            setIsOnline(true);
          }
        }
      });
    };
    checkOnline();
    return () => {
      isComponentMounted = false;
    };
  }, [user, onlineUsers]);

  useEffect(() => {
    let isComponentMounted = true;
    const friendId = showUserInfo.find((m) => m !== currentUser.uid);
    const getUser = async () => {
      try {
        const res = await axios(`${backendBaseURL}/user/create/` + friendId);
        if (isComponentMounted) {
          setUser(res.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    return () => {
      isComponentMounted = false;
    };
  }, [currentUser, showUserInfo, user]);

  useEffect(() => {
    let isComponentMounted = true;
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${backendBaseURL}/user/message/` + currentChat
        );
        if (isComponentMounted) {
          setMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
    return () => {
      isComponentMounted = false;
    };
  }, [currentChat]);

  return (
    <MessageItem key={keyValue} onClick={showUserData} className="d-flex flex-row w-100">
      <MessageItemUser src={user?.photoUrl} />
      <MessageInfo className="d-flex flex-column w-100">
        <MessageItemName>{user?.name}</MessageItemName>
        <MessageData online={isOnline} className="text-justify">
          {isOnline ? "Online" : "Offline"}
        </MessageData>
      </MessageInfo>
    </MessageItem>
  );
}
