import ChatMessageList from "../../components/ChatComponents/Message";
import UserChat from "../../components/ChatComponents/UserChat";
import styled from "styled-components";
import { useState } from "react";
// import { AuthContext } from "../../context/authContext";

const ChatPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const ChatPage = () => {
  let [userInfo, setUserInfo] = useState({
    name: "",
    img: "",
    chatData: [],
    uid: ""
  });
  return (
    <>
      <ChatPageWrapper className="d-flex">
        <ChatMessageList currentUserData={(value) => setUserInfo(value)} />
        <UserChat currentUserData={userInfo} />
      </ChatPageWrapper>
    </>
  );
};

export default ChatPage;
