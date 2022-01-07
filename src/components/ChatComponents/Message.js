import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { backendBaseURL } from "../../firebase";
import axios from "axios";
import { useContext, lazy, Suspense } from "react";
import { AuthContext } from "../../context/authContext";
import broadcast from "../../data/ChatPage/broadcast.png";
import { FiSearch } from "react-icons/fi/index";
import FindUser from "./FindUser";
import { useNavigate } from "react-router-dom";
import {
  MessageItemUser,
  MessageItem,
  MessageInfo,
  MessageItemName,
  MessageData,
} from "../Shared/UserImage/UserImage";
const Conversation = lazy(() => import("./Conversation"));

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
  background: ${(props) => props.theme.background};
  overflow: hidden;
  flex-direction: column;
  border-right: 2px solid ${(props) => props.theme.offline};
  width: 25%;
  justify-content: start;

  @media (max-width: 768px) {
    padding-top: 1rem;
    width: 100vw;
    overflow: hidden;
    height: 50vh !important;
    justify-content: start;
  }
`;

const MessageDivider = styled.section`
  background: ${(props) => props.theme.background};
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  column-gap: 0.5rem;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const MessageSearchBar = styled.input`
  border: 2px solid ${(props) => props.theme.offline};
  outline: none;
  border-radius: 2rem;
  height: 2.5rem;
  width: 100%;
  background: ${(props) => props.theme.background};
  font-size: 0.95rem;
  padding: 0 0.75rem;
  color: ${(props) => props.theme.font};

  &:hover,
  &:focus {
    border-color: ${(props) => props.theme.online};
  }
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
  let [userAdded, setUserAdded] = useState(false);
  const navigate = useNavigate();

  const searchRef = useRef();
  const handleSearching = (e) => {
    e.preventDefault();
    setSearchUser(searchRef.current.SearchBar.value);
    setSearching(true);
  };

  const handleInputSearch = (e) => {
    if (e.target.value === "") {
      setSearching(false);
    }
  };

  const handleUserAdd = () => {
    setUserAdded(true);
    console.log(userAdded);
  };

  useEffect(() => {
    let isComponentMounted = true;
    const getUserConversations = async () => {
      try {
        const response = await axios.get(
          `${backendBaseURL}/user/conversation/` + user.uid
        );
        if (isComponentMounted) {
          setConversations(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserConversations();
    return () => {
      isComponentMounted = false;
    };
  }, [user]);

  return (
    <>
      <MessageWrapper className="container d-flex h-100">
        <Messages className="d-flex flex-row w-100 justify-content-between align-items-center">
          Messages
          <MessageItem
            onClick={() => navigate("/profile")}
            className="d-flex flex-row p-0"
          >
            <MessageItemUser src={user.photoURL || user.photoUrl} />
          </MessageItem>
        </Messages>
        <form
          className="d-flex flex-row align-items-center"
          ref={searchRef}
          onSubmit={(e) => handleSearching(e)}
        >
          <MessageSearchBar
            placeholder="Search or Start New Chat"
            className="w-100 px-3 py-1 mb-3"
            name="SearchBar"
            onChange={(e) => handleInputSearch(e)}
            autoComplete="off"
            type="text"
          />
          <FiSearch
            style={searchStyles}
            size="1.25rem"
            color={(props) => props.theme.online}
          />
        </form>
        <MessageDivider className="d-flex">
          {conversations.length === 0 ? (
            searching ? (
              <FindUser
                conversations={conversations}
                friendEmail={searchUser}
                userAdded={handleUserAdd}
              />
            ) : (
              <MessageItem className="d-flex flex-row w-100">
                <MessageItemUser src={broadcast} />
                <MessageInfo className="d-flex flex-column w-100">
                  <MessageItemName>Start Conversations</MessageItemName>
                  <MessageData className="text-justify"> </MessageData>
                </MessageInfo>
              </MessageItem>
            )
          ) : searching ? (
            <FindUser conversations={conversations} friendEmail={searchUser} />
          ) : (
            Object.keys(conversations).map((key) => {
              return (
                <Suspense
                  fallback={
                    <MessageItem key={key} className="d-flex flex-row w-100">
                      <MessageInfo className="d-flex flex-column w-100">
                        <MessageItemName>
                          Loading Conversations...
                        </MessageItemName>
                        <MessageData className="text-justify">
                          Please wait...
                        </MessageData>
                      </MessageInfo>
                    </MessageItem>
                  }
                >
                  <Conversation
                    currentUserData={props.currentUserData}
                    currentUser={user}
                    showUserInfo={conversations[key].members}
                    keyValue={key}
                    id={conversations[key]._id}
                    onlineUsers={props.onlineUsers}
                  />
                </Suspense>
              );
            })
          )}
        </MessageDivider>
      </MessageWrapper>
    </>
  );
};

export default ChatMessageList;
