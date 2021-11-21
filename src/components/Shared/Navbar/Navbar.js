import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { darkBlue, red, white } from "../ColorPalette";
import { AiOutlineMenu } from "react-icons/ai/index";

const NavWrapper = styled.nav`
  height: 5rem;
  background: ${white};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem 1rem;
  }
`;
const NavBrand = styled(Link)`
  font-family: "Nunito" sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
  color: ${red};

  &:hover,
  &:focus {
    color: ${red};
  }
`;
// const NavBrandImg = styled.img``;
const NavLinkWraper = styled.div`
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const NavLink = styled(Link)`
  padding: 0.75rem 4rem;
  text-decoration: none;
  color: ${darkBlue};
  font-size: 1.15rem;
  font-weight: 600;
  font-family: "Nunito" sans-serif;
  text-align: center;
  
  &:hover,
  &:focus {
    text-decoration: underline;
    color: ${red};
  }
`;
const NavLogin = styled.button`
  padding: 0.65rem 2.5rem;
  border: none;
  border-radius: 1rem;
  background: ${red};
  color: ${white};
  font-family: "Nunito" sans-serif;
  font-weight: 600;
  font-size: 1.15rem;
  margin: 0 0 0 1rem;
  border: 2px solid ${red};

  &:hover,
  &:focus {
    color: ${darkBlue};
    background: ${red+"35"};
  }

  @media (max-width: 768px) {
    margin: 1rem 0 0 0;
  }
`;

const NavMobileHam = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;

    svg {
      width: 1.65rem;
      height: 1.65rem;
    }
  }
`;

export const NavMobileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  @media (max-width: 768px) {
    justify-content: flex-start;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    padding-top: 2rem;
    background: ${white};
    z-index: 10;
  }
`;

const Navbar = () => {
  let [toggleNav, setToggleNav] = useState(false);

  const navStyle = {
    display: toggleNav ? "flex" : "none",
  };

  const toggleNavItem = () => {
    if (window.screen.width <= 768) {
      setToggleNav(false);
    }
  };

  useEffect(() => {
    window.screen.width >= 768 ? setToggleNav(true) : setToggleNav(false);
  }, []);

  return (
    <>
      <NavWrapper className="container d-flex px-md-4 align-items-center justify-content-between">
        <div className="d-flex justify-content-between w-100">
          <NavBrand to="/">React</NavBrand>
          <NavMobileHam onClick={() => setToggleNav(!toggleNav)}>
            <AiOutlineMenu />
          </NavMobileHam>
        </div>
        <NavMobileWrapper style={navStyle}>
          <NavLinkWraper className="d-flex">
            <NavLink
              className="px-3"
              to="#about"
              onClick={() => toggleNavItem()}
            >
              About
            </NavLink>
            <NavLink
              className="px-3"
              to="#support"
              onClick={() => toggleNavItem()}
            >
              Support
            </NavLink>
            <NavLink
              className="px-3"
              to="#safety"
              onClick={() => toggleNavItem()}
            >
              Safety
            </NavLink>
          </NavLinkWraper>
          <NavLogin>Login</NavLogin>
        </NavMobileWrapper>
      </NavWrapper>
    </>
  );
};

export default Navbar;
