import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GiAcorn } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import Icon from '../shared/Icon';

const StyledHeader = styled.header`
  background-color: ${theme.colors.background};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: ${theme.colors.highlight};
    transform: scale(1.03);
  }
  
  svg {
    margin-right: 0.5rem;
    color: ${theme.colors.highlight};
  }
`;

const LogoText = styled(motion.span)`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.highlight};
    transition: width 0.3s ease;
  }
  
  ${Logo}:hover &::after {
    width: 100%;
  }
`;

const NavList = styled.ul<{ isOpen: boolean }>`
  display: flex;
  list-style: none;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    max-width: 300px;
    background-color: ${theme.colors.background};
    padding: 5rem 2rem;
    z-index: 99;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavItem = styled.li`
  margin: 0 1rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: 1.5rem 0;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.highlight};
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease-in-out;
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    closeMenu();
  };
  
  const logoIconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: 15, 
      scale: 1.2,
      filter: "drop-shadow(0 0 8px rgba(205, 133, 63, 0.8))",
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }
  };
  
  return (
    <IconContext.Provider value={{ style: { display: 'inline' } }}>
      <StyledHeader>
        <Nav>
          {location.pathname === '/' ? (
            <Logo onClick={handleLogoClick}>
              <motion.div
                variants={logoIconVariants}
                initial="initial"
                whileHover="hover"
              >
                <Icon icon={GiAcorn} size={24} color={theme.colors.highlight} />
              </motion.div>
              <LogoText>Autumn Oak</LogoText>
            </Logo>
          ) : (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo onClick={handleLogoClick}>
                <motion.div
                  variants={logoIconVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Icon icon={GiAcorn} size={24} color={theme.colors.highlight} />
                </motion.div>
                <LogoText>Autumn Oak</LogoText>
              </Logo>
            </Link>
          )}
          
          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? <Icon icon={FaTimes} /> : <Icon icon={FaBars} />}
          </MobileMenuButton>
          
          <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
          
          <NavList isOpen={isMenuOpen}>
            <NavItem>
              <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/skills" onClick={closeMenu}>Skills</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/academic" onClick={closeMenu}>Academic</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/activities" onClick={closeMenu}>Activities</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/blog" onClick={closeMenu}>Data Blog</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </StyledHeader>
    </IconContext.Provider>
  );
};

export default Header; 