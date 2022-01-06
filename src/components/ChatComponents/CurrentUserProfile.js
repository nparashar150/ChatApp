import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { signOutUser } from "../../firebase";
import BackButton from "../Shared/BackButton/BackButton";
import DarkModeToggle from "react-dark-mode-toggle";

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

const ProfileWrapper = styled.section`
  position: absolute;
  background: ${(props) => props.theme.background};
  width: max-content;
  height: max-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.75rem;
  outline: 2px solid ${(props) => props.theme.online};
  outline-offset: 0.25rem;
  padding: 3rem 5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 2rem 3rem;
  }
`;
const ProfileImageWrapper = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  overflow: hidden;
  outline-offset: 2px;
  outline: 2px solid ${(props) => props.theme.online};

  @media (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const ProfileInfoWrapper = styled.div``;
const ProfileName = styled.h1`
  color: ${(props) => props.theme.font};
  font-family: "Nunito" sans-serif;
  font-weight: 600;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
const ProfileEmail = styled.h3`
  color: ${(props) => props.theme.font};
  font-family: "Nunito" sans-serif;
  font-weight: 600;
  font-size: 1.6rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
const LogOut = styled.button`
  padding: 0.8rem 2.25rem;
  border: none;
  border-radius: 1rem;
  background: ${(props) => props.theme.offline};
  color: ${(props) => props.theme.font};
  font-family: "Nunito" sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0.25rem 0 0 0.25rem;
  border: 2px solid ${(props) => props.theme.online};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.font};
    background: ${(props) => props.theme.offline};
  }

  @media (max-width: 768px) {
    margin: 1rem 0 0 0;
    padding: 0.7rem 2rem;
  }
`;

const ToggleThemeWrapper = styled.div`
  position: fixed;
  top: 5%;
  right: 5%;
`;

export default function CurrentUserProfile({
  handleThemeChange,
  isDarkMode,
  setIsDarkMode,
}) {
  let { user } = useContext(AuthContext);
  return (
    <>
      <Wrapper>
        <ProfileWrapper className="d-flex justify-content-center align-items-center flex-column">
          <BackButton />
          <ToggleThemeWrapper>
            <DarkModeToggle
              onChange={() => handleThemeChange()}
              checked={isDarkMode}
              size={80}
              speed={2}
            />
          </ToggleThemeWrapper>
          <ProfileImageWrapper className="d-flex justify-content-center align-items-center">
            <ProfileImage src={user.photoURL || user.photoUrl} />
          </ProfileImageWrapper>
          <ProfileInfoWrapper className="d-flex justify-content-center align-items-center flex-column">
            <ProfileName>{user.displayName || user.name}</ProfileName>
            <ProfileEmail>{user.email}</ProfileEmail>
          </ProfileInfoWrapper>
          <LogOut onClick={signOutUser}>Sign Out</LogOut>
        </ProfileWrapper>
      </Wrapper>
    </>
  );
}
