import React, { useState, useEffect } from 'react';
import {
  lightTheme,
  darkTheme,
  GlobalStyle,
} from '../../components/Shared/ThemeEngine/Theme';
import Navbar from '../../components/Shared/Navbar/Navbar';
import { ThemeProvider } from 'styled-components';
import DownloadComponents from '../../components/DownloadComponents/DownloadComponents';

const DownloadPage = () => {
  const [isDarkMode, setIsDarkMode] = useState();

  const handleThemeChange = () => {
    localStorage.setItem('darkTheme', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

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
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Navbar
          handleThemeChange={handleThemeChange}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <DownloadComponents isDarkMode={isDarkMode} />
      </ThemeProvider>
    </>
  );
};

export default DownloadPage;
