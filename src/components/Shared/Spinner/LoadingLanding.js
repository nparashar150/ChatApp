import React from "react";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme, GlobalStyle } from "../ThemeEngine/Theme";
import { ThemeProvider } from "styled-components";
import styled, { keyframes } from "styled-components";

const circleOne = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
    }
`;

const circleTwo = keyframes`
  0%{
    transform: rotate(120deg);
  }
  100%{
    transform: rotate(480deg);
    }
`;

const circleThree = keyframes`
  0%{
    transform: rotate(240deg);
  }
  100%{
    transform: rotate(600deg);
    }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  background: ${(props) => props.theme.background};

  div {
    position: relative;
    width: 150px;
    height: 150px;
    margin: -30px;
    border: 4px solid transparent;
    border-radius: 50%;
    border-top: 4px solid ${(props) => props.theme.font};
    &::before {
      content: "";
      position: absolute;
      top: 12px;
      right: 12px;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      background: ${(props) => props.theme.font};
    }
    &:nth-child(1) {
      animation: ${circleThree} 1.5s linear infinite;
    }
    &:nth-child(2) {
      animation: ${circleTwo} 1.5s linear infinite;
    }
    &:nth-child(3) {
      position: absolute;
      top: -66.66px;
      animation: ${circleOne} 1.5s linear infinite;
    }
  }
`;

export default function LoadingLanding() {
  const [isDarkMode, setIsDarkMode] = useState();

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
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Wrapper>
          <LoadingContainer>
            <div></div>
            <div></div>
            <div></div>
          </LoadingContainer>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}
