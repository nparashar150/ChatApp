import ChatMessageList from "../../components/ChatComponents/Message";
import styled from "styled-components";
import { useState, useEffect, lazy, Suspense } from "react";
import { darkBlue } from "../../components/Shared/ColorPalette";
import { SocketAuthContextProvider } from "../../context/socketContext";
import {
  lightTheme,
  darkTheme,
  GlobalStyle,
} from "../../components/Shared/ThemeEngine/Theme";
import { ThemeProvider } from "styled-components";
const UserChat = lazy(() => import("../../components/ChatComponents/UserChat"));

const ChatPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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
    keyValue: 0,
  });
  let [onlineUsers, setOnlineUsers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const previousTheme = () => {
    const getTheme = localStorage.getItem("darkTheme");
    if (getTheme) {
      getTheme === "true" ? setIsDarkMode(true) : setIsDarkMode(false);
    } else {
      localStorage.setItem("darkTheme", false);
      setIsDarkMode(false);
    }
  };

  useEffect(() => {
    previousTheme();
  }, []);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <>
        <SocketAuthContextProvider>
          <ChatPageWrapper className="d-flex">
            <ChatMessageList
              currentUserData={(value) => setUserInfo(value)}
              onlineUsers={onlineUsers}
            />
            <Suspense
              fallback={<NoConversation>Loading Chat...</NoConversation>}
            >
              <UserChat
                key={userInfo.keyValue}
                currentUserData={userInfo}
                setOnlineUsers={(value) => setOnlineUsers(value)}
              />
            </Suspense>
          </ChatPageWrapper>
        </SocketAuthContextProvider>
      </>
    </ThemeProvider>
  );
};

export default ChatPage;
