import Navbar from "../../components/Shared/Navbar/Navbar";
import {
  LandingWrapper,
  LandingData,
  LandingHeading,
  LandingInfo,
  LandingAsset,
  LandingAssetMask,
  LaptopPreview,
  LaptopMask,
  Wrapper,
} from "../../components/LandingComponents/LandingPageElements";
import LandingPageJSON from "../../data/LandingPage/LandingPage.json";
import MacbookProLightTheme from "../../data/LandingPage/assets/Macbook-Pro-Light-Theme.png";
import MacbookProDarkTheme from "../../data/LandingPage/assets/Macbook-Pro-Dark-Theme.png";
import iPhone13ChatsSampleLightTheme from "../../data/LandingPage/assets/iPhone13-Chats-Sample-Light-Theme.png";
import iPhone13ChatsSampleDarkTheme from "../../data/LandingPage/assets/iPhone13-Chats-Sample-Dark-Theme.png";
import iPhone13ProfileSampleLightTheme from "../../data/LandingPage/assets/iPhone13-Profile-Sample-Light-Theme.png";
import iPhone13ProfileSampleDarkTheme from "../../data/LandingPage/assets/iPhone13-Profile-Sample-Dark-Theme.png";
import { Button } from "../../components/Shared/Button/Button";
import Footer from "../../components/Shared/Footer/Footer";
import { useEffect, useState } from "react";
import {
  lightTheme,
  darkTheme,
  GlobalStyle,
} from "../../components/Shared/ThemeEngine/Theme";
import { ThemeProvider } from "styled-components";

const LandingPage = () => {
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
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <>
        <Wrapper id="wrapper">
          <Navbar
            className="sticky-top"
            handleThemeChange={handleThemeChange}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <LandingWrapper className="container">
            <LandingData className="d-flex flex-column w-50 justify-content-center align-items-start">
              <LandingHeading>{LandingPageJSON.header}</LandingHeading>
              <LandingInfo>{LandingPageJSON.data}</LandingInfo>
              <Button to={"/login"}>Join Now !</Button>
            </LandingData>
            <LandingAssetMask>
              <LandingAsset
                src={
                  isDarkMode
                    ? iPhone13ChatsSampleDarkTheme
                    : iPhone13ChatsSampleLightTheme
                }
                alt={"iPhone13ChatSample"}
              />
            </LandingAssetMask>
          </LandingWrapper>
          <LandingWrapper className="container">
            <LandingAssetMask marginTop="-25vw" width="30rem">
              <LandingAsset
                src={
                  isDarkMode
                    ? iPhone13ProfileSampleDarkTheme
                    : iPhone13ProfileSampleLightTheme
                }
                alt={"iPhone13ProfileSample"}
              />
            </LandingAssetMask>
            <LandingData
              marginLeft="10vw"
              className="d-flex flex-column w-50 justify-content-center align-items-start"
            >
              <LandingHeading alignRight>
                {LandingPageJSON.header}
              </LandingHeading>
              <LandingInfo alignRight>{LandingPageJSON.data}</LandingInfo>
            </LandingData>
          </LandingWrapper>
          <LaptopMask>
            <LandingHeading mobile>
              {LandingPageJSON.laptopHeading}
            </LandingHeading>
            <LaptopPreview
              src={isDarkMode ? MacbookProDarkTheme : MacbookProLightTheme}
              alt={"MacbookProSample"}
            />
          </LaptopMask>
          <Footer />
        </Wrapper>
      </>
    </ThemeProvider>
  );
};

export default LandingPage;
