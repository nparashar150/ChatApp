import Navbar from "../../components/Shared/Navbar/Navbar";
import {
  lightTheme,
  darkTheme,
  GlobalStyle,
} from "../../components/Shared/ThemeEngine/Theme";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import AboutElemenets from "../../components/AboutComponents/AboutElemenets";
import Footer from "../../components/Shared/Footer/Footer";

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState();

  const handleThemeChange = () => {
    localStorage.setItem("darkTheme", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

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
        <Navbar
          className="sticky-top"
          handleThemeChange={handleThemeChange}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <AboutElemenets isDark={isDarkMode} />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default AboutPage;
