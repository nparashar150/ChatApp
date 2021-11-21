import styled, { keyframes } from "styled-components";

const SlideRight = keyframes`
  from {
    margin-right: -20%;
    opacity: 0;
  }
  to {
    margin-right: 0%;
    opacity: 1;
  }
`;
const SlideLeft = keyframes`
  from {
    margin-left: -20%;
    opacity: 0;
  }
  to {
    margin-left: 0%;
    opacity: 1;
  }
`;

export const LandingWrapper = styled.main`
  padding: 0 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 1rem;
    height: 100%;
  }
`;
export const LandingAssetMask = styled.div`
  position: absolute;
  right: 0%;
  margin-top: 12rem;
  height: 70vh;
  width: 40vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  animation: ${SlideRight} 1.5s ease-in-out;

  @media (max-width: 768px) {
    position: relative;
    padding: 0;
    justify-content: flex-end;
    margin-top: 2rem;
    width: 100vw;
    height: 100%;
  }
`;
export const LandingAsset = styled.img`
  height: auto;
  width: 40vw;

  @media (max-width: 768px) {
    width: 80vw;
  }
`;
export const LandingData = styled.div`
  height: 70vh;
  animation: ${SlideLeft} 1.5s ease-in-out;

  @media (max-width: 768px) {
    width: 100vw !important;
    padding: 0 1rem;
    height: 100%;
  }
`;
export const LandingHeading = styled.h1`
  font-size: 5rem;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;
export const LandingInfo = styled.p`
  font-weight: 600;
  font-size: 1.35rem;
`;