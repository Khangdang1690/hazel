import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GiAcorn, GiOakLeaf, GiMapleLeaf } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { theme } from '../../styles/theme';
import Icon from './Icon';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background};
  z-index: 9999;
  overflow: hidden;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 0 50px rgba(139, 69, 19, 0.5);
  position: relative;
`;

const Glow = styled(motion.div)`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border-radius: 1.5rem;
  background: linear-gradient(
    45deg,
    ${theme.colors.primary}40,
    ${theme.colors.highlight}60,
    ${theme.colors.secondary}40
  );
  filter: blur(15px);
  z-index: -1;
`;

const LogoWrapper = styled(motion.div)`
  color: ${theme.colors.primary};
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 15px ${theme.colors.highlight});
`;

const LogoText = styled(motion.h1)`
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  font-size: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px ${theme.colors.highlight};
`;

const ProgressBarContainer = styled.div`
  width: 250px;
  height: 8px;
  background-color: ${theme.colors.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background-color: ${theme.colors.highlight};
  border-radius: 8px;
  box-shadow: 0 0 10px ${theme.colors.highlight};
`;

const ProgressText = styled.div`
  color: ${theme.colors.text};
  font-size: 1rem;
  margin-top: 0.8rem;
  text-align: center;
  font-weight: bold;
  text-shadow: 0 0 5px ${theme.colors.highlight};
`;

interface LeafProps {
  top: string;
  left: string;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  color: string;
}

const Leaf = styled(motion.div)<LeafProps>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  color: ${props => props.color};
  opacity: 0.8;
  z-index: 1;
  filter: drop-shadow(0 0 5px ${props => props.color});
`;

// Define the leaf item interface
interface LeafItem {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  icon: IconType;
  color: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('SplashScreen mounted');
    
    // Simulate loading progress (3x faster than original)
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 6; // Increased to 6 (3x the original 2)
        console.log('Loading progress:', newProgress);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 66); // Set to 66ms (approximately 1/3 of original 200ms)

    // Complete animation after progress reaches 100% (3x faster than original)
    const timer = setTimeout(() => {
      console.log('Animation complete, triggering callback');
      setIsAnimating(false);
      setTimeout(onAnimationComplete, 333); // 1/3 of original 1000ms
    }, 3333); // 1/3 of original 10000ms (approximately)

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      console.log('SplashScreen unmounted');
    };
  }, [onAnimationComplete]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.4 } } // 1/3 of original 1.2s
  };

  const logoVariants = {
    initial: { scale: 0.2, opacity: 0, rotate: -45 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: { 
        duration: 0.67, // 1/3 of original 2s
        type: 'spring',
        stiffness: 120 // Increased stiffness for faster spring
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5, // 1/3 of original 1.5s
        duration: 0.5 // 1/3 of original 1.5s
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.67, // 1/3 of original 2s
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const waveEffect = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        delay: 0.83, // 1/3 of original 2.5s
        duration: 0.5, // 1/3 of original 1.5s
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: { ease: "easeOut", duration: 0.1 } // Faster progress bar updates
    }
  };

  const leafVariants = {
    initial: ({ delay }: { delay: number }) => ({
      opacity: 0,
      y: -100,
    }),
    animate: ({ delay, duration }: { delay: number, duration: number }) => ({
      opacity: [0, 0.8, 0],
      y: ['0vh', '100vh'],
      x: (Math.random() > 0.5 ? [0, 30, 0, -30, 0] : [0, -30, 0, 30, 0]), // Smaller movement for faster animation
      transition: {
        delay: delay / 3, // 1/3 of the original delay
        duration: duration / 3, // 1/3 of the original duration
        ease: "easeInOut"
      }
    })
  };

  // Generate random leaves
  const generateLeaves = (): LeafItem[] => {
    const leaves: LeafItem[] = [];
    const leafIcons: IconType[] = [GiOakLeaf, GiMapleLeaf];
    const colors = [theme.colors.primary, theme.colors.highlight, theme.colors.secondary];
    
    for (let i = 0; i < 30; i++) { // Fewer leaves for faster rendering
      const leaf: LeafItem = {
        id: i,
        top: `-50px`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 1.33, // 1/3 of original 4s
        duration: 1.67 + Math.random() * 2.67, // 1/3 of original (5+8)s
        size: 20 + Math.random() * 50, // Slightly smaller for performance
        rotate: Math.random() * 360,
        icon: leafIcons[Math.floor(Math.random() * leafIcons.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      leaves.push(leaf);
    }
    
    return leaves;
  };

  const leaves = generateLeaves();

  return (
    <AnimatePresence>
      {isAnimating && (
        <SplashContainer
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {leaves.map((leaf) => (
            <Leaf
              key={leaf.id}
              top={leaf.top}
              left={leaf.left}
              delay={leaf.delay}
              duration={leaf.duration}
              size={leaf.size}
              rotate={leaf.rotate}
              color={leaf.color}
              custom={{ delay: leaf.delay, duration: leaf.duration }}
              variants={leafVariants}
              initial="initial"
              animate="animate"
              style={{ rotate: `${leaf.rotate}deg` }}
            >
              <Icon icon={leaf.icon} size={leaf.size} />
            </Leaf>
          ))}
          
          <LogoContainer>
            <Glow variants={glowVariants} animate="animate" />
            <LogoWrapper
              variants={logoVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={waveEffect} animate="animate">
                <Icon icon={GiAcorn} size={150} color={theme.colors.primary} />
              </motion.div>
            </LogoWrapper>
            <LogoText
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              Hello
            </LogoText>
            
            <ProgressBarContainer>
              <ProgressBar 
                variants={progressVariants}
                initial="initial"
                animate="animate"
              />
            </ProgressBarContainer>
            <ProgressText>Loading... {progress}%</ProgressText>
          </LogoContainer>
        </SplashContainer>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 