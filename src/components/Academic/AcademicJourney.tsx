import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Container, Section, SectionTitle, SectionSubtitle } from '../../styles/common';
import { FaGraduationCap, FaChartLine, FaLaptopCode, FaMedal } from 'react-icons/fa';
import Icon from '../shared/Icon';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import AnimatedText from '../shared/AnimatedText';

const AcademicSection = styled(Section)`
  background-color: ${theme.colors.background};
  padding: 8rem 0 5rem;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
  
  &:before {
    content: '';
    position: absolute;
    width: 4px;
    background-color: ${theme.colors.primary};
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    
    @media (max-width: ${theme.breakpoints.tablet}) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ isLeft: boolean }>`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  left: ${props => props.isLeft ? '0' : '50%'};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: calc(100% - 60px);
    padding-left: 70px;
    padding-right: 25px;
    left: 0;
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background-color: ${theme.colors.cardBackground};
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  
  &:before {
    content: '';
    position: absolute;
    border-style: solid;
    top: 24px;
    width: 0;
    height: 0;
    
    @media (max-width: ${theme.breakpoints.tablet}) {
      left: -15px;
      border-width: 10px 15px 10px 0;
      border-color: transparent ${theme.colors.cardBackground} transparent transparent;
    }
  }
`;

const LeftContent = styled(TimelineContent)`
  &:before {
    right: -15px;
    border-width: 10px 0 10px 15px;
    border-color: transparent transparent transparent ${theme.colors.cardBackground};
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    &:before {
      left: -15px;
      border-width: 10px 15px 10px 0;
      border-color: transparent ${theme.colors.cardBackground} transparent transparent;
    }
  }
`;

const RightContent = styled(TimelineContent)`
  &:before {
    left: -15px;
    border-width: 10px 15px 10px 0;
    border-color: transparent ${theme.colors.cardBackground} transparent transparent;
  }
`;

const TimelineIcon = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${theme.colors.highlight};
  border-radius: 50%;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text};
  font-size: 1.5rem;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    left: 5px;
  }
`;

const LeftIcon = styled(TimelineIcon)`
  right: -75px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    left: 5px;
  }
`;

const RightIcon = styled(TimelineIcon)`
  left: -75px;
`;

const TimelineDate = styled.div`
  color: ${theme.colors.highlight};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const TimelineTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const TimelineDescription = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const TimelineSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
`;

const SkillTag = styled.span`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const academicTimelineData = [
  {
    id: 1,
    date: "2022 - Present",
    title: "Master's in Data Science",
    description: "Specializing in machine learning and statistical modeling with focus on predictive analytics and data visualization techniques.",
    icon: FaGraduationCap,
    skills: ["Machine Learning", "Statistical Modeling", "Big Data Analytics"],
    isLeft: true
  },
  {
    id: 2,
    date: "2021 - 2022",
    title: "Advanced Data Analysis Certificate",
    description: "Intensive program covering advanced statistical methods, time series analysis, and visualization techniques for complex datasets.",
    icon: FaChartLine,
    skills: ["Time Series Analysis", "Statistical Methods", "R Programming"],
    isLeft: false
  },
  {
    id: 3,
    date: "2018 - 2021",
    title: "Bachelor's in Computer Science",
    description: "Graduated with honors. Core coursework in algorithms, data structures, and software development with electives in data science.",
    icon: FaLaptopCode,
    skills: ["Python", "Algorithms", "Data Structures", "Software Development"],
    isLeft: true
  },
  {
    id: 4,
    date: "2020",
    title: "Data Science Competition Winner",
    description: "First place in university-wide data science competition. Created predictive model for environmental data with 94% accuracy.",
    icon: FaMedal,
    skills: ["Predictive Modeling", "Feature Engineering", "Data Cleaning"],
    isLeft: false
  }
];

const AcademicJourney: React.FC = () => {
  const titleAnimation = useScrollAnimation();
  const timeline1Animation = useScrollAnimation({ threshold: 0.1, rootMargin: '-50px' });
  const timeline2Animation = useScrollAnimation({ threshold: 0.1, rootMargin: '-50px' });
  const timeline3Animation = useScrollAnimation({ threshold: 0.1, rootMargin: '-50px' });
  const timeline4Animation = useScrollAnimation({ threshold: 0.1, rootMargin: '-50px' });
  
  const timelineAnimations = [
    timeline1Animation,
    timeline2Animation,
    timeline3Animation,
    timeline4Animation
  ];
  
  return (
    <AcademicSection id="academic">
      <Container>
        <motion.div
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 20 }}
          animate={titleAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText 
            text="Academic Journey" 
            highlight={["Academic"]} 
            className={SectionTitle}
          />
          <SectionSubtitle>Educational background and key milestones</SectionSubtitle>
        </motion.div>
        
        <TimelineContainer>
          {academicTimelineData.map((item, index) => (
            <TimelineItem 
              key={item.id}
              isLeft={item.isLeft}
              ref={timelineAnimations[index].ref}
              initial={{ opacity: 0, x: item.isLeft ? -50 : 50 }}
              animate={timelineAnimations[index].isVisible 
                ? { opacity: 1, x: 0 } 
                : { opacity: 0, x: item.isLeft ? -50 : 50 }
              }
              transition={{ 
                duration: 0.5, 
                delay: timelineAnimations[index].isVisible ? 0.1 : 0 
              }}
            >
              {item.isLeft ? (
                <>
                  <LeftIcon><Icon icon={item.icon} /></LeftIcon>
                  <LeftContent>
                    <TimelineDate>{item.date}</TimelineDate>
                    <TimelineTitle>{item.title}</TimelineTitle>
                    <TimelineDescription>{item.description}</TimelineDescription>
                    <TimelineSkills>
                      {item.skills.map((skill, i) => (
                        <SkillTag key={i}>{skill}</SkillTag>
                      ))}
                    </TimelineSkills>
                  </LeftContent>
                </>
              ) : (
                <>
                  <RightIcon><Icon icon={item.icon} /></RightIcon>
                  <RightContent>
                    <TimelineDate>{item.date}</TimelineDate>
                    <TimelineTitle>{item.title}</TimelineTitle>
                    <TimelineDescription>{item.description}</TimelineDescription>
                    <TimelineSkills>
                      {item.skills.map((skill, i) => (
                        <SkillTag key={i}>{skill}</SkillTag>
                      ))}
                    </TimelineSkills>
                  </RightContent>
                </>
              )}
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </AcademicSection>
  );
};

export default AcademicJourney; 