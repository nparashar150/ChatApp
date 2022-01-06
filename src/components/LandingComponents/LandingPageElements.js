import styled from "styled-components";
import { FadeIn } from "../Shared/Animation";

export const LandingWrapper = styled.main`
  padding: 0 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20vh;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 1rem;
    height: 100%;
  }
`;
export const LandingAssetMask = styled.div`
  margin-top: ${props => props.marginTop ? props.marginTop : "5rem"};
  width: ${props => props.width ? props.width : "40vw"};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  animation: ${FadeIn} 1.5s ease-in-out;

  @media (max-width: 768px) {
    display: none;
  }
`;
export const LandingAsset = styled.img`
  height: auto;
  width: ${props => props.width ? props.width : "30rem"};

  @media (max-width: 768px) {
    width: 100vw;
  }
`;
export const LandingData = styled.div`
  height: 100%;
  margin-top: -15rem;
  margin-left: ${props => props.marginLeft ? props.marginLeft : ""};
  width: 40vw;
  animation: ${FadeIn} 1.5s ease-in-out;

  @media (max-width: 768px) {
    width: 100vw !important;
    padding: 0 1rem;
    height: 100%;
    align-items: center !important;
    padding: 10vh 5vw;
  }
`;
export const LandingHeading = styled.h1`
  font-size: ${(props) => (props.mobile ? "3rem" : "4.5rem")};
  font-weight: 800;
  text-align: ${props => props.alignRight ? "right" : ""};
  color: ${props => props.theme.font};

  @media (max-width: 768px) {
    font-size: ${(props) => (props.mobile ? "2rem" : "3rem")};
    text-align: center;
    padding-top: 0;
  }
`;
export const LandingInfo = styled.p`
  font-weight: 600;
  font-size: 1.35rem;
  text-align: ${props => props.alignRight ? "right" : ""};
  color: ${props => props.theme.font};

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const MobileWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  padding-top: 5vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const MobileAssetMask = styled.div`
  height: 80vh;
  width: 40vw;
  padding: 0 15rem 0 10rem;
  /* overflow: hidden; */

  @media (max-width: 768px) {
    height: auto;
    width: auto;
    padding: 0;
  }
`;
export const MobileAsset = styled.img`
  height: 80vh;
  width: auto;
`;

export const LaptopPreview = styled.img`
  width: auto;
  height: 85vh;

  @media (max-width: 768px) {
    width: 100vw;
    height: auto;
  }
`;

export const LaptopMask = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding-top: 0;
  }
`;
export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${props => props.theme.background};
`;
