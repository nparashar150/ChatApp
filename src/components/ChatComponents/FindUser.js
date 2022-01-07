import { useState, useEffect } from "react";
import axios from "axios";
import { backendBaseURL } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import QuestionMark from "../../data/ChatPage/QuestionMark.svg";
import {
  MessageItemUser,
  MessageInfo,
  MessageItemName,
  MessageData,
  MessageItem,
} from "../Shared/UserImage/UserImage";

export default function FindUser({ friendEmail, conversations, userAdd }) {
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
      userAdd();
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
