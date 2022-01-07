import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md/index";

const BackButtonWrapper = styled.div`
  position: fixed;
  top: 5%;
  left: 5%;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: ${props => props.theme.online};
  cursor: pointer;
  outline: 2px solid ${props => props.theme.online};
  outline-offset: 2px;

  &:hover,
  &:focus {
    background: ${props => props.theme.online + "AA"};
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
        <MdOutlineArrowBackIos color={props => props.theme.font} />
      </BackButtonWrapper>
    </>
  );
}
