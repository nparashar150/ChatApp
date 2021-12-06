import styled from "styled-components";
import { darkBlue, red, white } from "../Shared/ColorPalette";
import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi/index";
import { AiOutlineMore } from "react-icons/ai/index";
import { io } from "socket.io-client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signIn } from "../../firebase";
// import axios from "axios";

const socket = io.connect("http://localhost:5000", { autoConnect: false });

const ChatArea = styled.section`
  height: 100vh;
  overflow-y: scroll;
`;
const ChatInfoWrapper = styled.div`
  padding: 1rem 0 0 0;
  padding-left: 0.5rem;
  gap: 0.75rem;
  justify-content: flex-start;
  cursor: pointer;
  /* position: fixed;
  top: 0%; */
  background: ${white};
`;
const ChatPanel = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;
const ChatInfoUserName = styled.p`
  font-size: ${(props) => (props.chatting ? "1rem" : "1.5rem")};
  font-weight: 700;
  margin-top: 1rem;
  cursor: pointer;
  background: ${(props) => (props.chatting ? `${white}` : `${white}`)};
`;
const ChatInfoUserImg = styled.img`
  width: ${(props) => (props.chatting ? "1.75rem" : "2.75rem")};
  height: ${(props) => (props.chatting ? "1.75rem" : "2.75rem")};
  border-radius: 50%;
  border: 2px solid ${red + "AA"};
`;
const ChatInfoUserMore = styled.div`
  cursor: pointer;
  margin-left: auto;
  padding-right: 1rem;
`;
const ChattingWrapper = styled.div`
  height: max-content;
`;
const Chat = styled.div`
  width: auto;
  margin: 0.5rem 0.75rem 0 0;
  height: 75vh;
  background: ${white};
`;
const ChattingGuest = styled.div`
  padding: 1rem 0 0 0;
  padding-right: 1rem;
  gap: 0.75rem;
  flex-direction: row-reverse;
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
  background: ${white};
`;
const ChattingInput = styled.input`
  border: 2px solid ${darkBlue + "50"};
  outline: none;
  border-radius: 2rem;
  height: 2.75rem;
  width: 70vw;
  background: ${white};
  font-size: 0.95rem;
  padding: 0 1rem;

  &:hover,
  &:focus {
    border-color: ${darkBlue + "AA"};
  }
`;
const ChattingInputSubmit = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  background: ${white};
  border-radius: 50%;
  border: 2px solid ${red + "AA"};

  &:hover,
  &:focus {
    background: ${red + "AA"};
    svg {
      color: ${white + "AA"};
    }
  }

  svg {
    margin-top: 2px;
    margin-right: 2px;
    color: ${red + "AA"};
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const UserChat = (props) => {
  let [message, setMessage] = useState("");
  let [inputValue, setInputValue] = useState([]);
  let [user, setUser] = useState([]);
  const signInStatus = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo) {
        setUser(userInfo);
        // console.log(res);
        // socket.emit("newUser", {user: user.displayName});
        socket.auth = { username: userInfo.uid };
        socket.connect();
        socket.on("connect_error", (err) => {
          if (err.message === "invalid username") {
            this.usernameAlreadySelected = false;
          }
        });
      } else {
        signIn();
      }
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    socket.emit("userChat", {
      message,
      username: user.displayName,
      image: user.photoURL,
    });
    setMessage("");
  };

  useEffect(() => {
    socket.on("userChat", (payload) => {
      setInputValue([...inputValue, payload]);
    });
  });

  useEffect(() => {
    signInStatus();
  });

  function handleTyping(e) {
    
  }

  return (
    <div className="w-75">
      {props.currentUser.name !== "" ? (
        <>
          <ChatArea className="w-100">
            <ChatInfoWrapper className="d-flex w-100 align-items-center">
              <ChatInfoUserImg src={props.currentUser.img} />
              <ChatInfoUserName>{props.currentUser.name}</ChatInfoUserName>
              <ChatInfoUserMore>
                <AiOutlineMore size="1.75rem" />
              </ChatInfoUserMore>
            </ChatInfoWrapper>
            <ChatPanel>
              <ChattingWrapper className="d-flex flex-column">
                <Chat className="">
                  {inputValue.map((payload, index) => {
                    return (
                      <ChattingGuest
                        key={index}
                        className="d-flex w-100 align-items-center"
                      >
                        <ChatInfoUserImg chatting src={payload.image} />
                        <ChatInfoUserName chatting>
                          {payload.message}
                        </ChatInfoUserName>
                      </ChattingGuest>
                    );
                  })}
                </Chat>
                <ChattingForm onSubmit={formHandler} className="d-flex">
                  <ChattingInput
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    placeholder="Type your message here..."
                  />
                  <ChattingInputSubmit onKeyPress={(e) => handleTyping(e)} className="d-flex justify-content-center align-items-center">
                    <FiSend />
                  </ChattingInputSubmit>
                </ChattingForm>
              </ChattingWrapper>
            </ChatPanel>
          </ChatArea>
        </>
      ) : (
        " "
      )}
    </div>
  );
};

export default UserChat;
