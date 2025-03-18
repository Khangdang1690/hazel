import styled from 'styled-components';
import { theme } from './theme';

export const Section = styled.section`
  padding: 5rem 0;
`;

export const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  position: relative;
  margin-bottom: 3rem;
  color: ${theme.colors.text};
  text-align: center;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${theme.colors.highlight};
  }
`;

export const SectionSubtitle = styled.h3`
  color: ${theme.colors.highlight};
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 400;
`;

export const Card = styled.div`
  background-color: ${theme.colors.cardBackground};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color ${theme.transitions.default};
  
  &:hover {
    background-color: ${theme.colors.highlight};
  }
`;

export const OutlineButton = styled(Button)`
  background-color: transparent;
  border: 2px solid ${theme.colors.primary};
  
  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

export const FlexContainer = styled.div<{ gap?: string, direction?: string, align?: string, justify?: string }>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '1rem'};
`;

export const Grid = styled.div<{ columns?: string, gap?: string }>`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fit, minmax(250px, 1fr))'};
  gap: ${props => props.gap || '2rem'};
`; 