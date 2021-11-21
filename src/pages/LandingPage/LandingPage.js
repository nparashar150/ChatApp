import Navbar from "../../components/Shared/Navbar/Navbar";
import {
  LandingWrapper,
  LandingData,
  LandingHeading,
  LandingInfo,
  LandingAsset,
  LandingAssetMask,
} from "../../components/LandingComponents/LandingPageElements";
import LandingPageJSON from "../../data/LandingPage/LandingPage.json";
import LandingPageAsset from "../../data/LandingPage/assets/laptop.png";
import { Button } from "../../components/Shared/Button/Button";

const LandingPage = () => {
  return (
    <>
      <Navbar className="sticky-top" />
      <LandingWrapper className="container">
        <LandingData className="d-flex flex-column w-50 justify-content-center align-items-start">
          <LandingHeading>{LandingPageJSON.header}</LandingHeading>
          <LandingInfo>{LandingPageJSON.data}</LandingInfo>
          <Button to={"#about"} >Explore more!</Button>
        </LandingData>
        <LandingAssetMask>
          <LandingAsset src={LandingPageAsset} />
        </LandingAssetMask>
      </LandingWrapper>
    </>
  );
};

export default LandingPage;
