import styled from "styled-components";
import {red, white, darkBlue} from "../ColorPalette";
import {Link} from "react-router-dom";

export const Button = styled(Link)`
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 1rem;
  background: ${red};
  color: ${white};
  font-family: "Nunito" sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  margin: .25rem 0 0 .25rem;
  border: 2px solid ${red};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${darkBlue};
    background: ${red + "35"};
  }

  @media (max-width: 768px) {
    margin: 1rem 0 0 0;
  }
`;
