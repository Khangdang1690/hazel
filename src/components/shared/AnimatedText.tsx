import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { theme } from '../../styles/theme';

const TextContainer = styled(motion.div)`
  position: relative;
  display: inline-block;
`;

const HighlightWord = styled.span`
  color: ${theme.colors.highlight};
`;

const RegularWord = styled.span`
  color: ${theme.colors.text};
`;

interface AnimatedTextProps {
  text: string;
  highlight?: string[];
  type?: 'heading' | 'subheading';
  delay?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  highlight = [],
  type = 'heading',
  delay = 0,
  className
}) => {
  const scrollAnimation = useScrollAnimation({ threshold: 0.2 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (scrollAnimation.isVisible) {
      setIsVisible(true);
    }
  }, [scrollAnimation.isVisible]);

  // Split the text into words
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const renderWord = (word: string, index: number) => {
    // Check if word should be highlighted
    const isHighlighted = highlight.includes(word);
    const WordComponent = isHighlighted ? HighlightWord : RegularWord;

    return (
      <WordComponent key={index}>
        {word.split('').map((char, charIndex) => (
          <motion.span
            key={`${index}-${charIndex}`}
            variants={child}
            style={{ display: 'inline-block' }}
          >
            {char}
          </motion.span>
        ))}
        {index < words.length - 1 && <span>&nbsp;</span>}
      </WordComponent>
    );
  };

  return (
    <TextContainer
      ref={scrollAnimation.ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => renderWord(word, index))}
    </TextContainer>
  );
};

export default AnimatedText; 