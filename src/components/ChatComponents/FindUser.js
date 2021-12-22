import styled from "styled-components";
import { SlideLeft } from "../Shared/Animation";
import { darkBlue, white } from "../Shared/ColorPalette";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendBaseURL } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import QuestionMark from "../../data/ChatPage/QuestionMark.svg";

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
  /* border: 2px solid ${darkBlue + "75"}; */
`;
export default function FindUser({ friendEmail, conversations }) {
  const [searchedUser, setSearchedUser] = useState([]);
  const [find, setFind] = useState(false);
  let { user } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios(
          `${backendBaseURL}/user/create/all/` + friendEmail
        );
        res.data.length === 0 ? setFind(false) : setFind(true);
        find ? setSearchedUser(res.data) : setSearchedUser([]);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [friendEmail, user, find, searchedUser]);

  const checkChat = (key) => {
    let found = conversations.length;
    conversations.forEach((element, index) => {
      if (conversations[index].members.indexOf(searchedUser[key].uid) > -1) {
        --found;
      }
    });
    found < conversations.length
      ? console.log("User already there.")
      : createChat(key);
  };

  const createChat = async (key) => {
    try {
      const chatUsers = {
        senderId: user.uid,
        receiverId: searchedUser[key].uid,
      };
      const res = await axios.post(
        `${backendBaseURL}/user/conversation`,
        chatUsers
      );
      console.log("User added.", res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {find ? (
        <>
          {searchedUser?.map((element, key) => {
            return (
              <MessageItem
                key={key}
                onClick={() => checkChat(key)}
                className="d-flex flex-row w-100"
              >
                <MessageItemUser src={element.photoUrl} />
                <MessageInfo className="d-flex flex-column w-100">
                  <MessageItemName>{element.name}</MessageItemName>
                  <MessageData className="text-justify">
                    {element.email}
                  </MessageData>
                </MessageInfo>
              </MessageItem>
            );
          })}
        </>
      ) : (
        <MessageItem className="d-flex flex-row w-100">
          <MessageItemUser src={QuestionMark} />
          <MessageInfo className="d-flex flex-column w-100">
            <MessageItemName>{"User Not Found"}</MessageItemName>
            <MessageData className="text-justify">
              {"Invite him to the Website"}
            </MessageData>
          </MessageInfo>
        </MessageItem>
      )}
    </>
  );
}
