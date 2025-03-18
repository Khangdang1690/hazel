import React, { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Card = styled(motion.div)`
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.5s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const CardContent = styled.div`
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  position: relative;
`;

const Highlight = styled.div<{ x: number; y: number; opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at ${props => props.x}px ${props => props.y}px,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 50%
  );
  opacity: ${props => props.opacity};
  pointer-events: none;
  z-index: 2;
  transition: opacity 0.2s ease;
`;

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className,
  intensity = 10,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [highlightOpacity, setHighlightOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate relative mouse position inside the card
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    
    // Calculate center of the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on mouse position relative to center
    const angleX = (relY - centerY) / (rect.height / 2) * intensity;
    const angleY = (centerX - relX) / (rect.width / 2) * intensity;
    
    setRotateX(angleX);
    setRotateY(angleY);
    setMouseX(relX);
    setMouseY(relY);
    setHighlightOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setHighlightOpacity(0);
  };

  return (
    <Card
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease'
      }}
    >
      <CardContent>
        <Highlight 
          x={mouseX} 
          y={mouseY} 
          opacity={highlightOpacity} 
        />
        {children}
      </CardContent>
    </Card>
  );
};

export default HoverCard; 