import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md/index";
import { red, white } from "../ColorPalette";

const BackButtonWrapper = styled.div`
  position: fixed;
  top: 5%;
  left: 5%;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: ${red};
  cursor: pointer;
  outline: 2px solid ${red};
  outline-offset: 2px;

  &:hover,
  &:focus {
    background: ${red + "AA"};
  }
`;

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <>
      <BackButtonWrapper
        onClick={() => navigate(-1)}
        className="d-flex justify-content-center align-items-center"
      >
        <MdOutlineArrowBackIos color={white} />
      </BackButtonWrapper>
    </>
  );
}
