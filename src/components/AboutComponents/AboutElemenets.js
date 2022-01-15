import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  MessageItem,
  MessageInfo,
  MessageItemName,
  MessageData,
  MessageItemUser,
} from "../Shared/UserImage/UserImage";
import {
  LandingWrapper,
  LandingData,
  LandingHeading,
  LandingInfo,
  LandingAssetMask,
  LandingAsset,
} from "../LandingComponents/LandingPageElements";
import logoLight from "../../data/logo-light.svg";
import logoDark from "../../data/logo-dark.svg";
import AboutPageData from "../../data/AboutPage/AboutPage.json";
import Spinner from "../Shared/Spinner/Spinner";
const AboutWrapper = styled.section`
  width: 100vw;
  height: 100%;
  color: ${(props) => props.theme.font};
  gap: 5vh;
  padding: 0;
`;

const AuthorName = styled(MessageItemName)`
  font-size: 1.5rem;
`;

const AuthorData = styled(MessageData)`
  font-size: 1.25rem;
`;

const AuthorInfo = styled(MessageInfo)`
  align-items: center;
`;

const AuthItem = styled(MessageItem)``;

const AuthorImage = styled(MessageItemUser)`
  width: 10rem;
  height: auto;
  border: none;
  outline: 2px solid ${(props) => props.theme.online};
  outline-offset: 4px;
  cursor: pointer;
`;

const AuthorList = styled.div`
  padding-bottom: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100vw;
  @media (max-width: 768px) {
    padding-bottom: 0;
    flex-direction: column !important;
  }
`;

const AboutData = styled(LandingData)`
  margin-top: -20vw;
`;

export default function AboutElemenets({ isDark }) {
  const [contributors, setContributors] = useState(null);
  const [loading, setLoading] = useState(true);

  const getContributors = async () => {
    const GET_CONFIG = {
      method: "GET",
      url: "https://api.github.com/repos/nparashar150/threejs_/stats/contributors",
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
      },
    };
    const res = await axios(GET_CONFIG);
    const list_authors = [];
    res.data.forEach((element) => {
      list_authors.push({ author: element.author, commits: element.total });
    });
    let sortedArray = list_authors.sort((a, b) =>
      a.commits < b.commits ? 1 : b.commits < a.commits ? -1 : 0
    );
    setContributors(sortedArray);
    setLoading(false);
  };

  useEffect(() => {
    let isComponentMounted = true;
    isComponentMounted && getContributors();
    return () => {
      isComponentMounted = false;
    }
  }, []);
  return (
    <>
      <LandingWrapper reversed overflowHidden className="container">
        <AboutData
          aboutPage
          className="d-flex flex-column w-50 justify-content-center align-items-start"
        >
          <LandingHeading mobile>{AboutPageData[2].header}</LandingHeading>
          <LandingInfo>{AboutPageData[0].data}</LandingInfo>
        </AboutData>
        <LandingAssetMask>
          <LandingAsset
            marginTop="-25vh"
            src={isDark ? logoDark : logoLight}
            alt={"iPhone13ChatSample"}
          />
        </LandingAssetMask>
      </LandingWrapper>
      <AboutWrapper className="container d-flex justify-content-center align-items-center flex-column">
        <LandingHeading mobile>{"Contributors"}</LandingHeading>
        <AuthorList className="container px-md-5">
          {loading ? (
            <Spinner />
          ) : (
            contributors?.map((element, key) => {
              return (
                <AuthItem
                  noBorder
                  onClick={() =>
                    window.open(element.author.html_url, "_blank").focus()
                  }
                  key={key}
                  className="d-flex flex-row flex-column"
                >
                  <AuthorImage src={element.author.avatar_url} />
                  <AuthorInfo className="d-flex flex-column">
                    <AuthorName>{element.author.login}</AuthorName>
                    <AuthorData className="text-justify">
                      Total Commits: {element.commits}
                    </AuthorData>
                  </AuthorInfo>
                </AuthItem>
              );
            })
          )}
        </AuthorList>
      </AboutWrapper>
    </>
  );
}
