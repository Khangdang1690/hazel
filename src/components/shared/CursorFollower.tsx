import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { theme } from '../../styles/theme';

const Cursor = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.colors.highlight};
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
`;

const CursorRing = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  border: 2px solid ${theme.colors.highlight};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
`;

interface CursorFollowerProps {
  disabled?: boolean;
}

const CursorFollower: React.FC<CursorFollowerProps> = ({ disabled = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hoveredClickable, setHoveredClickable] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  
  const ringXSpring = useSpring(ringX, springConfig);
  const ringYSpring = useSpring(ringY, springConfig);
  
  useEffect(() => {
    if (disabled) return;
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };
    
    const handleMouseDown = () => {
      setClicked(true);
    };
    
    const handleMouseUp = () => {
      setClicked(false);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the element or its parents are clickable
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.closest('.clickable');
      
      setHoveredClickable(!!isClickable);
    };
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible, disabled]);
  
  if (disabled) return null;
  
  return (
    <>
      <Cursor
        style={{
          opacity: isVisible ? 1 : 0,
          x: cursorXSpring,
          y: cursorYSpring,
          scale: clicked ? 0.8 : hoveredClickable ? 1.5 : 1,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }
        }}
      />
      <CursorRing
        style={{
          opacity: isVisible ? 1 : 0,
          x: ringXSpring,
          y: ringYSpring,
          scale: clicked ? 1.2 : hoveredClickable ? 2 : 1,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }
        }}
      />
    </>
  );
};

export default CursorFollower; 