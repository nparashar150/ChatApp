import styled from 'styled-components';
import { FadeIn } from '../Shared/Animation';

export const LandingWrapper = styled.main`
  padding: 0 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20vh;
  overflow: ${(props) => (props.overflowHidden ? 'hidden' : '')};

  @media (max-width: 768px) {
    flex-direction: ${(props) =>
    props.reversed ? 'column' : 'column-reverse'};
    padding: 0 1rem;
    height: 100%;
    margin-bottom: 5vh;
  }
`;
export const LandingAssetMask = styled.div`
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '5rem')};
  width: ${(props) => (props.width ? props.width : '40vw')};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  animation: ${FadeIn} 1.5s ease-in-out;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
export const LandingAsset = styled.img`
  height: auto;
  width: ${(props) => (props.width ? props.width : '30rem')};

  @media (max-width: 768px) {
    width: 100vw;
    padding: 0 5vw;
    margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  }
`;
export const LandingData = styled.div`
  height: 100%;
  margin-top: -15rem;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  width: 40vw;
  animation: ${FadeIn} 1.5s ease-in-out;

  @media (max-width: 768px) {
    width: 100vw !important;
    /* padding: 0 1rem; */
    height: 100%;
    align-items: center !important;
    padding: 10vh 5vw;
    margin-top: 0;
    margin-left: 0;
  }

  ${({ aboutPage }) =>
    aboutPage &&
    `
    padding-top: 45vh;
  `}
`;
export const LandingHeading = styled.h1`
  font-size: ${(props) => (props.mobile ? '3rem' : '4.5rem')};
  font-weight: 800;
  text-align: ${(props) => (props.alignRight ? 'right' : '')};
  color: ${(props) => props.theme.font};
  animation: ${FadeIn} 1.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: ${(props) => (props.mobile ? '2rem' : '3rem')};
    text-align: center;
    padding-top: 0;
  }
`;
export const LandingInfo = styled.p`
  font-weight: 600;
  font-size: 1.35rem;
  text-align: ${(props) => (props.alignRight ? 'right' : '')};
  color: ${(props) => props.theme.font};
  animation: ${FadeIn} 1.5s ease-in-out;

  @media (max-width: 768px) {
    text-align: center;
    padding-bottom: ${(props) =>
    props.mobilePaddingBottom ? props.mobilePaddingBottom : ''};
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
  animation: ${FadeIn} 1.5s ease-in-out;

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
    /* flex-direction: column-reverse; */
    /* padding-top: 0; */
    display: none;
  }
`;
export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${(props) => props.theme.background};
`;
