import ChatMessageList from "../../components/ChatComponents/Message";
import styled from "styled-components";
import { useState, lazy, Suspense } from "react";
import { darkBlue } from "../../components/Shared/ColorPalette";
const UserChat = lazy(() => import("../../components/ChatComponents/UserChat"));

const ChatPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
const NoConversation = styled.div`
  font-size: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70vw;
  color: ${darkBlue + "75"};
  padding: 2rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const ChatPage = () => {
  let [userInfo, setUserInfo] = useState({
    name: "",
    img: "",
    chatData: [],
    uid: "",
    keyValue: 0
  });
  return (
    <>
      <ChatPageWrapper className="d-flex">
        <ChatMessageList currentUserData={(value) => setUserInfo(value)} />
        <Suspense fallback={<NoConversation>Loading Chat...</NoConversation>}>
          <UserChat key={userInfo.keyValue} currentUserData={userInfo} />
        </Suspense>
      </ChatPageWrapper>
    </>
  );
};

export default ChatPage;
