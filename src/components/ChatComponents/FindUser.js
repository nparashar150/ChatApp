import styled from "styled-components";
import { SlideLeft } from "../Shared/Animation";
import { darkBlue, white } from "../Shared/ColorPalette";
import { useState, useEffect } from "react";
import axios from "axios";

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
export default function FindUser({ friendEmail }) {
  const [user, setUser] = useState({});
  const [find, setFind] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:5000/user/create/all/" + friendEmail
        );
        res.data.length === 0 ? setFind(false) : setFind(true);
        find ? setUser(res.data[0]) : setUser({});
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [friendEmail, user, find]);

  return (
    <>
      {find ? (
        <MessageItem className="d-flex flex-row w-100">
          <MessageItemUser src={user.photoUrl} />
          <MessageInfo className="d-flex flex-column w-100">
            <MessageItemName>{user.name}</MessageItemName>
            <MessageData className="text-justify">{""}</MessageData>
          </MessageInfo>
        </MessageItem>
      ) : (
        <MessageItem className="d-flex flex-row w-100">
          <MessageItemUser
            src={
              "https://cdn4.iconfinder.com/data/icons/material-set-6-2/48/543-512.png"
            }
          />
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
