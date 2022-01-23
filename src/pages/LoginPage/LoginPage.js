import React, { useState, useEffect } from 'react';
import Login from '../../components/LoginComponents/Login';
import {
  lightTheme,
  darkTheme,
  GlobalStyle,
} from '../../components/Shared/ThemeEngine/Theme';
import { ThemeProvider } from 'styled-components';
export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

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
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <>
        <Login handleThemeChange={handleThemeChange} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </>
    </ThemeProvider>
  );
}
