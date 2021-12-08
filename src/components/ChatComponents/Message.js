import styled from "styled-components";
import { darkBlue, white } from "../Shared/ColorPalette";
import { SlideLeft } from "../Shared/Animation";
import ChatSampleData from "../../data/ChatPage/ChatPage.json";
import { useState } from "react";
import broadcast from "../../data/ChatPage/broadcast.png";

const Messages = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  padding: 1.5rem 0 0.5rem 0;
  width: 100%;
  padding-left: 0.5rem;

  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
    padding: 0 1rem;
  }
`;

const MessageWrapper = styled.section`
  background: ${white};
  overflow: hidden;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0;
    width: 100vw !important;
  }
`;

const MessageDivider = styled.section`
  background: ${white};
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  column-gap: 0.5rem;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

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

const MessageSearchBar = styled.input`
  border: 1px solid ${darkBlue};
  outline: none;
  background: ${white};
  border-radius: 1rem;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ChatMessageList = (props) => {
  const [searchUser, setSearchUser] = useState("");

  return (
    <>
      <MessageWrapper className="container d-flex w-25 h-100">
        <Messages>Messages</Messages>
        <MessageSearchBar
          onChange={(e) => setSearchUser(e.target.value)}
          value={searchUser}
          type="text"
          placeholder="Search Chat"
          className="w-100 px-3 py-1 mb-3"
        />
        <MessageDivider className="d-flex">
          {Object.keys(ChatSampleData.Users).map((key) => {
            const showUserInfo = () => {
              let name = ChatSampleData.Users[key].name;
              let img = broadcast;
              props.currentUser({ name: name, img: img });
            };
            return (
              <MessageItem
                key={key}
                onClick={showUserInfo}
                className="d-flex flex-row w-100"
              >
                <MessageItemUser src={broadcast} />
                <MessageInfo className="d-flex flex-column w-100">
                  <MessageItemName>
                    {ChatSampleData.Users[key].name}
                  </MessageItemName>
                  <MessageData
                   className="text-justify">
                    {ChatSampleData.Users[key].message}
                  </MessageData>
                </MessageInfo>
              </MessageItem>
            );
          })}
        </MessageDivider>
      </MessageWrapper>
    </>
  );
};

export default ChatMessageList;
