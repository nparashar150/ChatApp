import styled from "styled-components";
import { FiSend } from "react-icons/fi/index";
import { AiOutlineMore } from "react-icons/ai/index";
import { io } from "socket.io-client";
import axios from "axios";
import { backendBaseURL } from "../../firebase";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { SocketAuthContext } from "../../context/socketContext";
import Spinner from "../Shared/Spinner/Spinner";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
const ChattingSection = styled.section`
  @media (max-width: 768px) {
    width: 100% !important;
  }
`;
const ChatArea = styled.section`
  height: 100vh;
  overflow-y: scroll;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;
const ChatInfoWrapper = styled.div`
  padding: 1rem 0 0 0;
  padding-left: 0.5rem;
  gap: 0.75rem;
  justify-content: flex-start;
  cursor: pointer;
  background: ${(props) => props.theme.background};
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;
const ChatPanel = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;
const ChatInfoUserName = styled.div`
  font-size: ${(props) => (props.chatting ? "1rem" : "1.5rem")};
  font-weight: 700;
  cursor: pointer;
  background: ${(props) =>
    props.chatting
      ? `${(props) => props.theme.background}`
      : `${(props) => props.theme.background}`};
  color: ${(props) => props.theme.font};
  width: 50%;
  text-align: ${(props) => (props.right ? "right" : "left")};

  @media (max-width: 768px) {
    white-space: ${(props) => (props.chatting ? "nowrap" : "normal")};
    overflow: scroll;
  }
`;
const ChatInfoUserImg = styled.img`
  width: ${(props) => (props.chatting ? "1.75rem" : "2.75rem")};
  height: ${(props) => (props.chatting ? "1.75rem" : "2.75rem")};
  border-radius: 50%;
`;
const ChatInfoUserMore = styled.div`
  cursor: pointer;
  margin-left: auto;
  padding-right: 1rem;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;
const ChattingWrapper = styled.div`
  height: max-content;
`;
const Chat = styled.div`
  width: auto;
  margin: 0.5rem 0.75rem 0 0;
  height: 75vh;
  background: ${(props) => props.theme.background};

  @media (max-width: 768px) {
    height: calc(50vh - 8rem);
  }
`;
const ChattingGuest = styled.div`
  padding: 1rem 0 0 0;
  gap: 0.75rem;
  justify-content: flex-start;
  cursor: pointer;
`;
const ChattingForm = styled.form`
  gap: 0.5rem;
  position: fixed;
  bottom: 0%;
  right: 0%;
  margin-bottom: 0.75rem;
  margin-right: 0.75rem;
  background: ${(props) => props.theme.background};

  @media (max-width: 768px) {
    width: 100vw;
    justify-content: end;
    align-items: center;
  }
`;
const ChatTime = styled.p`
  font-weight: 600;
  font-size: 0.7rem;
  background: ${(props) => props.theme.background};
  cursor: pointer;
  margin: 0;
  width: 100%;
`;
const ChattingInput = styled.input`
  border: 2px solid ${(props) => props.theme.offline};
  outline: none;
  border-radius: 2rem;
  height: 2.75rem;
  width: 70vw;
  background: ${(props) => props.theme.background};
  font-size: 0.95rem;
  padding: 0 1rem;
  color: ${(props) => props.theme.font};

  &:hover,
  &:focus {
    border-color: ${(props) => props.theme.online};
  }

  @media (max-width: 768px) {
    width: 80vw;
  }
`;
const ChattingInputSubmit = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  background: ${(props) => props.theme.offline};
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.online};

  &:hover,
  &:focus {
    background: ${(props) => props.theme.background};
    svg {
      color: ${(props) => props.theme.online};
    }
  }

  svg {
    margin-top: 2px;
    margin-right: 2px;
    color: ${(props) => props.theme.font + "AA"};
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const NoConversation = styled.div`
  font-size: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70vw;
  color: ${(props) => props.theme.font + "75"};
  padding: 2rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media (max-width: 768px) {
    height: 100%;
    width: 100vw;
    font-size: 3rem;
  }
`;

const UserChat = ({ currentUserData, setOnlineUsers }) => {
  let [message, setMessage] = useState("");
  let [chat, setChat] = useState([]);
  let [incommingMessage, setIncommingMessage] = useState(null);
  let [loading, setLoading] = useState(true);
  const socketRef = useRef();
  const scrollRef = useRef();
  const { user } = useContext(AuthContext);
  const { socketEvent, dispatch } = useContext(SocketAuthContext);

  useEffect(() => {
    let isComponentMounted = true;
    const checkSocket = (dispatch) => {
      dispatch({ type: "SOCKET_EVENT_START" });
      if (socketEvent) {
        socketRef.current = socketEvent;
      } else {
        socketRef.current = io("http://localhost:8000");
      }
      dispatch({
        type: "SOCKET_EVENT_SUCCESS",
        payload: socketRef.current,
      });
      console.log(socketRef.current);
    };
    if (isComponentMounted) {
      checkSocket(dispatch);
    }
    return () => {
      isComponentMounted = false;
    };
  }, [socketEvent, dispatch]);

  useEffect(() => {
    let isComponentMounted = true;
    if (isComponentMounted) {
      socketRef?.current?.on("getMessage", (chatData) => {
        setIncommingMessage(
          {
            sender: chatData.senderId,
            text: chatData.text,
            createdAt: Date.now(),
          },
          (err) => {
            console.log(err);
          }
        );
      });
    }
    return () => {
      isComponentMounted = false;
    };
  }, []);

  useEffect(() => {
    let isComponentMounted = true;
    if (isComponentMounted) {
      incommingMessage &&
        currentUserData?.members?.includes(incommingMessage.sender) &&
        setChat((prev) => [...prev], incommingMessage);
    }
    return () => {
      isComponentMounted = false;
    };
  }, [incommingMessage, currentUserData]);

  useEffect(() => {
    let isComponentMounted = true;
    socketRef?.current?.emit("sendUser", user.uid);
    socketRef?.current?.on("getUsers", (users) => {
      if (isComponentMounted) {
        setOnlineUsers(users);
      }
    });
    return () => {
      isComponentMounted = false;
    };
  }, [setOnlineUsers, user]);

  useEffect(() => {
    let isComponentMounted = true;
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${backendBaseURL}/user/message/` + currentUserData.chatId
        );
        setChat(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (isComponentMounted) {
      getMessages();
    }
    return () => {
      isComponentMounted = false;
    };
  }, [currentUserData, chat]);

  const formHandler = async (e) => {
    e.preventDefault();
    const messagePush = {
      sender: user.uid,
      text: message,
      conversationId: currentUserData.chatId,
    };

    try {
      const pushChat = await axios.post(
        `${backendBaseURL}/user/message`,
        messagePush
      );
      setChat([...chat, pushChat.data]);
      setMessage("");
    } catch (err) {
      console.log(err);
    }

    socketRef?.current?.emit(
      "sendMessage",
      {
        senderId: user.uid,
        receiverId: currentUserData.uid,
        text: message,
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chat]);

  return (
    <ChattingSection className="w-75">
      {currentUserData.name !== "" ? (
        <>
          <ChatArea className="w-100">
            <ChatInfoWrapper className="d-flex w-100 align-items-center">
              <ChatInfoUserImg src={currentUserData.img} />
              <ChatInfoUserName>{currentUserData.name}</ChatInfoUserName>
              <ChatInfoUserMore>
                <AiOutlineMore size="1.75rem" />
              </ChatInfoUserMore>
            </ChatInfoWrapper>
            <ChatPanel>
              <ChattingWrapper className="d-flex flex-column">
                <Chat className="">
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                      <Spinner />
                    </div>
                  ) : (
                    chat?.map((index, key) => {
                      return (
                        <ChattingGuest
                          key={key}
                          className={
                            user.uid === index.sender
                              ? "d-flex flex-row-reverse w-100 align-items-start px-2"
                              : "d-flex flex-row w-100 align-items-start px-3"
                          }
                          ref={scrollRef}
                        >
                          <ChatInfoUserImg
                            chatting
                            src={
                              user.uid === index.sender
                                ? user.photoURL || user.photoUrl
                                : currentUserData.img
                            }
                          />
                          <ChatInfoUserName
                            chatting
                            className={
                              user.uid === index.sender
                                ? "text-end"
                                : "text-start"
                            }
                          >
                            {index.text}
                            <ChatTime
                              className={
                                user.uid === index.sender
                                  ? "text-end"
                                  : "text-start"
                              }
                            >
                              {timeAgo.format(new Date(index.createdAt))}
                            </ChatTime>
                          </ChatInfoUserName>
                        </ChattingGuest>
                      );
                    })
                  )}
                </Chat>
                <ChattingForm onSubmit={formHandler} className="d-flex">
                  <ChattingInput
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    placeholder="Type your message here..."
                  />
                  <ChattingInputSubmit
                    onClick={formHandler}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <FiSend />
                  </ChattingInputSubmit>
                </ChattingForm>
              </ChattingWrapper>
            </ChatPanel>
          </ChatArea>
        </>
      ) : (
        <NoConversation>Open a conversation to start chat.</NoConversation>
      )}
    </ChattingSection>
  );
};

export default UserChat;
