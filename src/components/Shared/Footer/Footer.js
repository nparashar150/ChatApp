import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.section`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.font};
  margin-top: 5vh;
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.25rem;
  text-align: center;
`;

export default function Footer() {
  return (
    <>
      <FooterWrapper>Expecoof @ 2021.</FooterWrapper>
    </>
  );
}
