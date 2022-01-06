import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import CurrentUserProfile from "../../components/ChatComponents/CurrentUserProfile";
import { Navigate } from "react-router-dom";
import {
  lightTheme,
  darkTheme,
  GlobalStyle,
} from "../../components/Shared/ThemeEngine/Theme";
import { ThemeProvider } from "styled-components";

const UserProfile = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

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
  let { user } = useContext(AuthContext);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <>
        {user ? (
          <CurrentUserProfile
            handleThemeChange={handleThemeChange}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        ) : (
          <Navigate to="/" />
        )}
      </>
    </ThemeProvider>
  );
};

export default UserProfile;
