import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai/index";
import logoDark from "../../../data/logo-dark.svg";
import logoLight from "../../../data/logo-light.svg";
import DarkModeToggle from "react-dark-mode-toggle";

const NavWrapper = styled.nav`
  height: 5rem;
  background: ${(props) => props.theme.background};
  z-index: 10;

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
  color: ${(props) => props.theme.online};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.online};
  }
`;
const NavBrandImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-left: -1.5rem;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 3rem;
    height: 3rem;
  }
`;
const NavLinkWraper = styled.div`
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const NavLink = styled(Link)`
  padding: 0.75rem 4rem;
  text-decoration: none;
  color: ${(props) => props.theme.font};
  font-size: 1.15rem;
  font-weight: 600;
  font-family: "Nunito" sans-serif;
  text-align: center;

  &:hover,
  &:focus {
    text-decoration: underline;
    color: ${(props) => props.theme.online};
  }
`;
// const NavLogin = styled.button`
//   padding: 0.65rem 2.5rem;
//   border: none;
//   border-radius: 1rem;
//   background: ${red};
//   color: ${white};
//   font-family: "Nunito" sans-serif;
//   font-weight: 600;
//   font-size: 1.15rem;
//   margin: 0 0 0 1rem;
//   border: 2px solid ${red};

//   &:hover,
//   &:focus {
//     color: ${darkBlue};
//     background: ${red + "35"};
//   }

//   @media (max-width: 768px) {
//     margin: 1rem 0 0 0;
//   }
// `;

const NavMobileHam = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 0.5rem;

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
    background: ${(props) => props.theme.background};
    z-index: 10;
  }
`;

const Navbar = ({ handleThemeChange, isDarkMode, setIsDarkMode }) => {
  let [toggleNav, setToggleNav] = useState(false);

  const navStyle = {
    display: toggleNav ? "flex" : "none",
  };

  const toggleNavItem = () => {
    if (window.screen.width <= 768) {
      setToggleNav(false);
    }
  };

  // const handleLogin = async () => {
  //   navigate("/login");
  // };
  // console.log(user);
  useEffect(() => {
    window.screen.width >= 768 ? setToggleNav(true) : setToggleNav(false);
  }, []);
  return (
    <>
      <NavWrapper className="container d-flex px-md-4 align-items-center justify-content-between">
        <div className="d-flex justify-content-between w-100">
          <NavBrand to="/">
            <NavBrandImage
              src={isDarkMode ? logoDark : logoLight}
              alt={"logo"}
            />
          </NavBrand>
          <NavMobileHam onClick={() => setToggleNav(!toggleNav)}>
            <AiOutlineMenu />
          </NavMobileHam>
        </div>
        <NavMobileWrapper style={navStyle}>
          <NavLinkWraper className="d-flex">
            <NavLink
              className="px-3"
              to="/about"
              onClick={() => toggleNavItem()}
            >
              About
            </NavLink>
            <NavLink
              className="px-3"
              to="/download"
              onClick={() => toggleNavItem()}
            >
              Download
            </NavLink>
            {/* <NavLink
              className="px-3"
              to="/login"
              onClick={() => toggleNavItem()}
            >
              Browser
            </NavLink> */}
          </NavLinkWraper>
          {/* <NavLogin onClick={handleLogin} >
            {"Login"}
          </NavLogin> */}
          <DarkModeToggle
            onChange={() => handleThemeChange()}
            checked={isDarkMode}
            size={80}
            speed={2}
          />
        </NavMobileWrapper>
      </NavWrapper>
    </>
  );
};

export default Navbar;
