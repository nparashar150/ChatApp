import styled from "styled-components";
import { SlideLeft } from "../Shared/Animation";
// import ChatSampleData from "../../data/ChatPage/ChatPage.json";
import { darkBlue, white } from "../Shared/ColorPalette";
// import broadcast from "../../data/ChatPage/broadcast.png";
import { useState, useEffect } from "react";
import axios from "axios";

const MessageItem = styled.div`
  background: ${white};
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid ${darkBlue + "50"};
  gap: 0.75rem;
  animation: ${SlideLeft} 1.5s ease-in-out;
`;

const MessageInfo = styled.div`
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
`;

const MessageItemName = styled.p`
  font-weight: 800;
  font-size: 0.95rem;
  background: ${white};
  text-align: center;
  cursor: pointer;
  margin: 0;
`;

const MessageData = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
  background: ${white};
  text-align: center;
  cursor: pointer;
  margin: 0;
  width: max-content;
`;

const MessageItemUser = styled.img`
  width: 3rem;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${darkBlue + "75"};
`;

export default function Conversation({
  showUserInfo,
  currentUser,
  showUser,
  keys,
  currentUserData,
}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = showUserInfo.find((m) => m !== currentUser.uid);
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:5000/user/create/" + friendId
        );
        setUser(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, showUserInfo]);

  const showUserData = () => {
    currentUserData({ name: user.name, img: user.photoUrl });
  };
  return (
    <MessageItem
      onClick={showUserData}
      key={keys}
      className="d-flex flex-row w-100"
    >
      <MessageItemUser src={user.photoUrl} />
      <MessageInfo className="d-flex flex-column w-100">
        <MessageItemName>{user.name}</MessageItemName>
        <MessageData className="text-justify"> </MessageData>
      </MessageInfo>
    </MessageItem>
  );
}
