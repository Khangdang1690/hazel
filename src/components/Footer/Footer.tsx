import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaKaggle, FaHeart, FaChevronUp } from 'react-icons/fa';
import { GiAcorn } from 'react-icons/gi';
import { theme } from '../../styles/theme';
import Icon from '../shared/Icon';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const StyledFooter = styled.footer`
  background-color: ${theme.colors.cardBackground};
  padding: 4rem 0 2rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterSection = styled.div``;

const FooterLogo = styled(Link)`
  display: flex;
  align-items: center;
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text};
  text-decoration: none;
  margin-bottom: 1.5rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${theme.colors.highlight};
  }
`;

const FooterText = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 1.5rem;
  line-height: 1.7;
`;

const FooterTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: ${theme.colors.highlight};
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 1rem;
`;

const FooterLink = styled(Link)`
  color: ${theme.colors.lightText};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${theme.colors.highlight};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  color: ${theme.colors.text};
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${theme.colors.highlight};
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background-color: rgba(245, 245, 220, 0.1);
  margin: 3rem 0 2rem;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  color: ${theme.colors.lightText};
  font-size: 0.9rem;
`;

const ScrollToTop = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.highlight};
  }
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const section1Animation = useScrollAnimation({ threshold: 0.1 });
  const section2Animation = useScrollAnimation({ threshold: 0.1 });
  const section3Animation = useScrollAnimation({ threshold: 0.1 });
  const bottomAnimation = useScrollAnimation({ threshold: 0.1 });
  
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterContent>
          <motion.div
            ref={section1Animation.ref}
            initial={{ opacity: 0, y: 20 }}
            animate={section1Animation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <FooterSection>
              <FooterLogo to="/">
                <Icon icon={GiAcorn} />
                Hazel Oak
              </FooterLogo>
              <FooterText>
                Data scientist and visualization expert specializing in turning complex data into beautiful, 
                insightful visualizations through statistical analysis and machine learning.
              </FooterText>
              <SocialLinks>
                <SocialLink href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <Icon icon={FaLinkedin} />
                </SocialLink>
                <SocialLink href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <Icon icon={FaGithub} />
                </SocialLink>
                <SocialLink href="https://kaggle.com/" target="_blank" rel="noopener noreferrer">
                  <Icon icon={FaKaggle} />
                </SocialLink>
              </SocialLinks>
            </FooterSection>
          </motion.div>
          
          <motion.div
            ref={section2Animation.ref}
            initial={{ opacity: 0, y: 20 }}
            animate={section2Animation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FooterSection>
              <FooterTitle>Quick Links</FooterTitle>
              <FooterLinks>
                <FooterLinkItem>
                  <FooterLink to="/">Home</FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/skills">Skills</FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/projects">Projects</FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/academic">Academic</FooterLink>
                </FooterLinkItem>
                <FooterLinkItem>
                  <FooterLink to="/activities">Activities</FooterLink>
                </FooterLinkItem>
              </FooterLinks>
            </FooterSection>
          </motion.div>
          
          <motion.div
            ref={section3Animation.ref}
            initial={{ opacity: 0, y: 20 }}
            animate={section3Animation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FooterSection>
              <FooterTitle>Contact Info</FooterTitle>
              <FooterText>
                Boston, MA<br />
                hazel.oak@example.com<br />
                (555) 123-4567
              </FooterText>
            </FooterSection>
          </motion.div>
        </FooterContent>
        
        <FooterDivider />
        
        <motion.div
          ref={bottomAnimation.ref}
          initial={{ opacity: 0, y: 10 }}
          animate={bottomAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FooterBottom>
            <Copyright>
              &copy; {new Date().getFullYear()} Hazel Oak. Made with <Icon icon={FaHeart} style={{ color: theme.colors.highlight, verticalAlign: 'middle' }} /> in React.
            </Copyright>
            
            {/* <ScrollToTop onClick={scrollToTop}>
              <Icon icon={FaChevronUp} />
            </ScrollToTop> */}
          </FooterBottom>
        </motion.div>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer; 