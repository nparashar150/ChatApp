import ChatMessageList from "../../components/ChatComponents/Message";
import UserChat from "../../components/ChatComponents/UserChat";
import styled from "styled-components";
import { useState } from "react";

const ChatPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const ChatPage = () => {
  let [userInfo, setUserInfo] = useState({
    name: "",
    img: "",
  });

  return (
    <>
      <ChatPageWrapper className="d-flex">
        <ChatMessageList currentUser={(value) => setUserInfo(value)} />
        <UserChat currentUser={userInfo} />
      </ChatPageWrapper>
    </>
  );
};

export default ChatPage;
