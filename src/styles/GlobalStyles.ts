import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${theme.fonts.main};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
  
  h1 {
    font-size: 3.5rem;
    
    @media (max-width: ${theme.breakpoints.tablet}) {
      font-size: 2.5rem;
    }
  }
  
  h2 {
    font-size: 2.5rem;
    
    @media (max-width: ${theme.breakpoints.tablet}) {
      font-size: 2rem;
    }
  }
  
  h3 {
    font-size: 1.75rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  a {
    color: ${theme.colors.highlight};
    text-decoration: none;
    transition: color ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }
  
  button {
    cursor: pointer;
    border: none;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-family: ${theme.fonts.main};
    font-weight: 500;
    transition: background-color ${theme.transitions.default};
    
    &:hover {
      background-color: ${theme.colors.highlight};
    }
  }
  
  section {
    padding: 5rem 0;
    
    @media (max-width: ${theme.breakpoints.tablet}) {
      padding: 3rem 0;
    }
  }
  
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
`; 