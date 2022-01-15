import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { ButtonSubmit } from "../Shared/Button/Button";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa/index";
import Footer from "../Shared/Footer/Footer";
import {
  LandingWrapper,
  LandingData,
  LandingHeading,
  LandingInfo,
} from "../LandingComponents/LandingPageElements";
import DownloadPageJSON from "../../data/DownloadPage/DownloadPageData.json";

const DownloadWrapper = styled.section`
  width: 100vw;
  height: calc(80vh - 1rem);
  background: ${(props) => props.theme.background};
  overflow: hidden;
`;
const DownloadButton = styled(ButtonSubmit)`
  display: inline-block;
`;

const DownloadButtonWrapper = styled.div`
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column !important;
  }
`;

const Loading = styled.h1`
  color: ${(props) => props.theme.font};
  text-transform: capitalize;
  font-size: 1.5rem;
  font-weight: 600;
`;

const DonwloadPageData = styled(LandingData)`
  margin-top: 0;
`;

const DownloadLandingWrapper = styled(LandingWrapper)`
  margin-bottom: 0;
  justify-content: center;
`;

const DownloadLandingHeading = styled(LandingHeading)`
  text-align: center;
`;

const DownloadLandingInfo = styled(LandingInfo)`
  text-align: center;
`;

const DownloadComponents = ({ isDarkMode }) => {
  const [releases, setReleases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [OS, setOS] = useState(null);

  const handleDownload = () => {
    const generatedDownloadURL = releases;
    generatedDownloadURL && window.open(generatedDownloadURL);
  };

  const getContributors = useCallback(async () => {
    if (navigator.appVersion.indexOf("Win") !== -1) setOS("Windows OS");
    if (navigator.appVersion.indexOf("Mac") !== -1) setOS("MacOS");
    if (navigator.appVersion.indexOf("X11") !== -1) setOS("UNIX OS");
    if (navigator.appVersion.indexOf("Linux") !== -1) setOS("Linux OS");
    const GET_CONFIG = {
      method: "GET",
      url: "https://api.github.com/repos/nparashar150/threejs_/releases",
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
      },
    };
    const res = await axios(GET_CONFIG);
    res.data[0].assets.forEach(function (e) {
      if (OS === "Windows OS") {
        if (e.browser_download_url.indexOf("exe") > -1) {
          if (e.browser_download_url.indexOf("exe.blockmap") > -1) {
            return 0;
          } else {
            setReleases(e.browser_download_url);
          }
        }
      }
      if (OS === "Linux OS" || OS === "UNIX OS") {
        if (e.browser_download_url.indexOf("AppImage") > -1) {
          setReleases(e.browser_download_url);
        }
      }
      if (OS === "MacOS") {
        if (e.browser_download_url.indexOf("dmg") > -1) {
          setReleases(e.browser_download_url);
        }
      }
    });
    setLoading(false);
  }, [OS]);

  useEffect(() => {
    getContributors();
  }, [getContributors]);

  return (
    <>
      <DownloadWrapper className="container d-flex justify-content-center align-items-center">
        <DownloadLandingWrapper className="container">
          <DonwloadPageData className="d-flex flex-column w-50 justify-content-center align-items-center">
            <DownloadLandingHeading>
              {DownloadPageJSON.header}
            </DownloadLandingHeading>
            <DownloadLandingInfo>{DownloadPageJSON.info}</DownloadLandingInfo>
            {loading ? (
              <>
                <Loading>loading...</Loading>
              </>
            ) : (
              <>
                <DownloadButtonWrapper className="d-flex jusify-content-between align-items-center">
                  <DownloadButton
                    onClick={handleDownload}
                    mediaWidth="80vw"
                    padding=".5rem 2.5rem"
                    radius="2rem"
                    type="submit"
                  >
                    {OS === "Windows OS" && <FaWindows size="1.5rem" />}
                    {(OS === "Linux OS" || OS === "UNIX OS") && (
                      <FaLinux size="1.5rem" />
                    )}
                    {OS === "MacOS" && <FaApple size="1.5rem" />}
                    &nbsp; {OS}
                  </DownloadButton>
                </DownloadButtonWrapper>
              </>
            )}
          </DonwloadPageData>
        </DownloadLandingWrapper>
      </DownloadWrapper>
      <Footer />
    </>
  );
};

export default DownloadComponents;
