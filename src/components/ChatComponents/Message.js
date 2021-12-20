import styled from "styled-components";
import { darkBlue, white } from "../Shared/ColorPalette";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Conversation from "./Conversation";
import { SlideLeft } from "../Shared/Animation";
import broadcast from "../../data/ChatPage/broadcast.png";
import { FiSearch } from "react-icons/fi/index";
import FindUser from "./FindUser";

const Messages = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  padding: 1.25rem 0 0.5rem 0;
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
  border-right: 2px solid ${darkBlue + "50"};

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

const MessageSearchBar = styled.input`
  border: 2px solid ${darkBlue + "50"};
  outline: none;
  border-radius: 2rem;
  height: 2.5rem;
  width: 100%;
  background: ${white};
  font-size: 0.95rem;
  padding: 0 0.75rem;

  &:hover,
  &:focus {
    border-color: ${darkBlue + "AA"};
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const MessageItem = styled.div`
  background: ${white};
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
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

const searchStyles = {
  marginLeft: "-10%",
  marginTop: "-1rem",
};

const ChatMessageList = (props) => {
  let [searchUser, setSearchUser] = useState("");
  let { user } = useContext(AuthContext);
  let [conversations, setConversations] = useState([]);
  let [searching, setSearching] = useState(false);
  // console.log(user.photoUrl);

  const searchRef = useRef();
  const handleSearching = (e) => {
    e.preventDefault();
    console.log(searchRef.current.SearchBar.value);
    setSearchUser(searchRef.current.SearchBar.value);
    setSearching(true);
  };

  const handleInputSearch = (e) => {
    if (e.target.value === "") {
      setSearching(false);
    }  
  }

  useEffect(() => {
    const getUserConversations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user/conversation/" + user.uid
        );
        setConversations(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserConversations();
  }, [user.uid]);

  return (
    <>
      <MessageWrapper className="container d-flex w-25 h-100">
        <Messages className="d-flex flex-row w-100 justify-content-between align-items-center">
          Messages
          <MessageItem className="d-flex flex-row p-0">
            <MessageItemUser src={user.photoURL} />
          </MessageItem>
        </Messages>
        <form
          className="d-flex flex-row align-items-center"
          ref={searchRef}
          onSubmit={(e) => handleSearching(e)}
        >
          <MessageSearchBar
            type="text"
            placeholder="Search or Start New Chat"
            className="w-100 px-3 py-1 mb-3"
            name="SearchBar"
            onChange={(e) => handleInputSearch(e)}
          />
          <FiSearch
            style={searchStyles}
            size="1.25rem"
            color={darkBlue + "AA"}
          />
        </form>
        <MessageDivider className="d-flex">
          {conversations.length === 0 ? (
            <MessageItem className="d-flex flex-row w-100">
              <MessageItemUser src={broadcast} />
              <MessageInfo className="d-flex flex-column w-100">
                <MessageItemName>Start Conversations</MessageItemName>
                <MessageData className="text-justify"> </MessageData>
              </MessageInfo>
            </MessageItem>
          ) : searching ? (
            <FindUser friendEmail={searchUser} />
          ) : (
            Object.keys(conversations).map((key) => {
              return (
                <Conversation
                  currentUserData={props.currentUserData}
                  currentUser={user}
                  showUserInfo={conversations[key].members}
                  keys={key}
                  id={conversations[key]._id}
                />
              );
            })
          )}
        </MessageDivider>
      </MessageWrapper>
    </>
  );
};

export default ChatMessageList;
