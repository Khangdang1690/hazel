import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import { theme } from '../../styles/theme';

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${theme.colors.highlight};
  transform-origin: 0%;
  z-index: 9999;
`;

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${theme.colors.cardBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  color: ${theme.colors.text};
  z-index: 9999;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    font-size: 12px;
  }
`;

const ProgressCircle = styled(motion.svg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Circle = styled.circle`
  fill: none;
  stroke-width: 3px;
  stroke-linecap: round;
`;

const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollPercentage(Math.floor(latest * 100));
    });
  }, [scrollYProgress]);
  
  const indicatorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: scrollPercentage > 3 ? 1 : 0, 
      y: scrollPercentage > 3 ? 0 : 20 
    }
  };

  return (
    <>
      <ProgressBar style={{ scaleX }} />
      <ScrollIndicator
        variants={indicatorVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      >
        <ProgressCircle viewBox="0 0 100 100">
          <Circle 
            cx="50" 
            cy="50" 
            r="20" 
            stroke={theme.colors.primary} 
          />
          <Circle 
            cx="50" 
            cy="50" 
            r="20" 
            stroke={theme.colors.highlight} 
            strokeDasharray="125.6"
            strokeDashoffset={125.6 - (125.6 * scrollPercentage) / 100}
            transform="rotate(-90 50 50)"
          />
        </ProgressCircle>
        {scrollPercentage}%
      </ScrollIndicator>
    </>
  );
};

export default ScrollProgress; 