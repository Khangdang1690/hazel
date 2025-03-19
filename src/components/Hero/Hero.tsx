import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { FaLinkedin, FaGithub, FaKaggle } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";
import { GiAcorn } from "react-icons/gi";
import Icon from "../shared/Icon";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import AnimatedText from "../shared/AnimatedText";
import AnimatedBackground from "../shared/AnimatedBackground";

const HeroSection = styled.section`
  // height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
  background-color: ${theme.colors.background};
`;

const HeroContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 2;
`;

const ProfileImageContainer = styled(motion.div)`
  margin-bottom: 2rem;
  margin-top: 5rem;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${theme.colors.highlight};
  box-shadow: 0 0 20px rgba(237, 188, 74, 0.3);

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 150px;
    height: 150px;
  }
`;

const ProfileImageGlow = styled(motion.div)`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    ${theme.colors.highlight}20,
    ${theme.colors.primary}20,
    ${theme.colors.highlight}20
  );
  z-index: -1;
`;

const AcornIcon = styled(motion.div)`
  position: absolute;
  color: ${theme.colors.primary};
  opacity: 0.1;
  z-index: 1;
`;

const generateRandomPosition = () => {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 10,
    rotation: Math.random() * 360,
  };
};

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: ${theme.colors.text};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: ${theme.colors.secondary};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const Description = styled(motion.p)`
  max-width: 600px;
  margin-bottom: 2.5rem;
  color: ${theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.7;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;

  &.primary {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};

    &:hover {
      background-color: ${theme.colors.highlight};
    }
  }

  &.secondary {
    background-color: transparent;
    color: ${theme.colors.text};
    border: 2px solid ${theme.colors.primary};

    &:hover {
      background-color: ${theme.colors.primary};
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  color: ${theme.colors.text};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.highlight};
  }
`;

const Hero: React.FC = () => {
  const titleControls = useAnimation();
  const subtitleControls = useAnimation();
  const descriptionControls = useAnimation();
  const buttonsControls = useAnimation();
  const socialsControls = useAnimation();
  const profileImageControls = useAnimation();

  const heroAnimation = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "-100px",
  });

  useEffect(() => {
    // Reset animations when the component mounts or when it comes into view
    if (heroAnimation.isVisible) {
      const sequence = async () => {
        await profileImageControls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.7, ease: "easeOut" },
        });
        await titleControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7 },
        });
        await subtitleControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7 },
        });
        await descriptionControls.start({
          opacity: 1,
          transition: { duration: 0.7 },
        });
        await buttonsControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7 },
        });
        await socialsControls.start({
          opacity: 1,
          transition: { duration: 0.7 },
        });
      };

      sequence();
    } else {
      // Reset animations when component is not visible
      profileImageControls.start({ scale: 0.8, opacity: 0 });
      titleControls.start({ opacity: 0, y: -20 });
      subtitleControls.start({ opacity: 0, y: -20 });
      descriptionControls.start({ opacity: 0 });
      buttonsControls.start({ opacity: 0, y: 20 });
      socialsControls.start({ opacity: 0 });
    }
  }, [
    heroAnimation.isVisible,
    titleControls,
    subtitleControls,
    descriptionControls,
    buttonsControls,
    socialsControls,
    profileImageControls,
  ]);

  const acorns = Array.from({ length: 15 }, (_, i) => {
    const position = generateRandomPosition();
    return (
      <AcornIcon
        key={i}
        style={{
          top: `${position.y}%`,
          left: `${position.x}%`,
          fontSize: `${position.size}px`,
          rotate: `${position.rotation}deg`,
        }}
        animate={{
          y: [0, 10, 0],
          rotate: [
            position.rotation,
            position.rotation + 10,
            position.rotation,
          ],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon icon={GiAcorn} />
      </AcornIcon>
    );
  });

  return (
    <HeroSection ref={heroAnimation.ref}>
      <AnimatedBackground
        particleCount={100}
        particleColor={theme.colors.highlight}
      />
      {acorns}
      <HeroContainer>
        <ProfileImageContainer
          initial={{ scale: 0.8, opacity: 0 }}
          animate={profileImageControls}
        >
          <ProfileImage src="/acornpic.jpg" alt="Hazel" />
          <ProfileImageGlow
            animate={{
              boxShadow: [
                "0 0 20px rgba(237, 188, 74, 0.3)",
                "0 0 30px rgba(237, 188, 74, 0.5)",
                "0 0 20px rgba(237, 188, 74, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </ProfileImageContainer>

        <HeroTitle>
          <AnimatedText text="Hazel Oak" highlight={["Hazel"]} delay={0.2} />
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: -20 }}
          animate={subtitleControls}
        >
          Data Scientist & Visualization Expert
        </HeroSubtitle>
        <Description initial={{ opacity: 0 }} animate={descriptionControls}>
          Transforming complex data into beautiful, insightful visualizations.
          Specializing in statistical analysis, machine learning, and creating
          interactive dashboards that tell compelling stories with data.
        </Description>
        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={buttonsControls}
        >
          <Button to="/projects" className="primary">
            View Projects
          </Button>
          <Button to="/contact" className="secondary">
            Get in Touch
          </Button>
        </ButtonContainer>
        <SocialLinks initial={{ opacity: 0 }} animate={socialsControls}>
          <SocialLink
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={FaLinkedin} />
          </SocialLink>
          <SocialLink
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={FaGithub} />
          </SocialLink>
          <SocialLink
            href="https://kaggle.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={FaKaggle} />
          </SocialLink>
        </SocialLinks>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
