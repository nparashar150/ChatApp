import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  lightTheme,
  darkTheme,
  GlobalStyle,
} from '../ThemeEngine/Theme';
import { ThemeProvider } from 'styled-components';
import Spinner from './Spinner';

const SpinnerWrapper = styled.div`
  background: ${(props) =>
    props.theme.background ? props.theme.background : '#FFF5F7'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const SpinnerOnLoad = () => {
  const [isDarkMode, setIsDarkMode] = useState();

  const previousTheme = () => {
    const getTheme = localStorage.getItem('darkTheme');
    if (getTheme) {
      getTheme === 'true' ? setIsDarkMode(true) : setIsDarkMode(false);
    } else {
      localStorage.setItem('darkTheme', false);
      setIsDarkMode(false);
    }
  };

  useEffect(() => {
    previousTheme();
  }, []);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    </ThemeProvider>
  );
};

export default SpinnerOnLoad;
