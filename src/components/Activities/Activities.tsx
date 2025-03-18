import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Container, Section, SectionTitle, SectionSubtitle, Grid } from '../../styles/common';
import { FaUsers, FaCode, FaLaptop, FaTrophy, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Icon from '../shared/Icon';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const ActivitiesSection = styled(Section)`
  background-color: ${theme.colors.background};
  padding: 8rem 0 5rem;
`;

const ActivityCard = styled(motion.div)`
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: ${theme.colors.highlight};
  }
`;

const ActivityIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${theme.colors.text};
  font-size: 1.5rem;
`;

const ActivityTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const ActivityDescription = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ActivityMeta = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.highlight};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ActivityHighlights = styled.ul`
  margin-top: 1.5rem;
  padding-left: 1.5rem;
  
  li {
    color: ${theme.colors.text};
    margin-bottom: 0.5rem;
    
    &:before {
      content: "•";
      color: ${theme.colors.highlight};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

const activitiesData = [
  {
    id: 1,
    title: "Data Science Club President",
    description: "Led weekly workshops and organizing guest speaker events for a club of 50+ students interested in data science and analytics.",
    icon: FaUsers,
    date: "2021 - Present",
    location: "University Campus",
    highlights: [
      "Organized Data Hackathon with 100+ participants",
      "Created mentorship program connecting students with industry professionals",
      "Developed learning materials for Python, R, and data visualization"
    ]
  },
  {
    id: 2,
    title: "Kaggle Competition Team Lead",
    description: "Formed and led a team of 5 students in multiple Kaggle competitions focused on machine learning challenges.",
    icon: FaTrophy,
    date: "2020 - Present",
    location: "Online",
    highlights: [
      "Top 10% finish in Titanic ML competition",
      "Developed ensemble learning approaches for time-series forecasting",
      "Shared findings through university blog posts"
    ]
  },
  {
    id: 3,
    title: "Data Visualization Workshop Instructor",
    description: "Created and delivered workshops on data visualization best practices and tools to students and faculty.",
    icon: FaLaptop,
    date: "2021",
    location: "University Data Lab",
    highlights: [
      "Taught Tableau, D3.js, and matplotlib to 30+ attendees",
      "Created practical exercises with real-world datasets",
      "Developed project-based curriculum for beginners"
    ]
  },
  {
    id: 4,
    title: "Hackathon Participant",
    description: "Participated in multiple hackathons focused on data-driven solutions to social and environmental challenges.",
    icon: FaCode,
    date: "2019 - Present",
    location: "Various Locations",
    highlights: [
      "Won 'Best Use of Data' award at Climate Hack 2021",
      "Developed ML model for predicting urban air quality",
      "Created interactive visualization of public transit data"
    ]
  }
];

const Activities: React.FC = () => {
  const titleAnimation = useScrollAnimation();
  const activity1Animation = useScrollAnimation({ threshold: 0.1 });
  const activity2Animation = useScrollAnimation({ threshold: 0.1 });
  const activity3Animation = useScrollAnimation({ threshold: 0.1 });
  const activity4Animation = useScrollAnimation({ threshold: 0.1 });
  
  const activityAnimations = [
    activity1Animation,
    activity2Animation,
    activity3Animation,
    activity4Animation
  ];
  
  return (
    <ActivitiesSection id="activities">
      <Container>
        <motion.div
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 20 }}
          animate={titleAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Student Activities</SectionTitle>
          <SectionSubtitle>Data science clubs, hackathons, and competitions</SectionSubtitle>
        </motion.div>
        
        <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap="2rem">
          {activitiesData.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              ref={activityAnimations[index].ref}
              initial={{ opacity: 0, y: 30 }}
              animate={activityAnimations[index].isVisible 
                ? { opacity: 1, y: 0 } 
                : { opacity: 0, y: 30 }
              }
              transition={{ 
                duration: 0.5, 
                delay: activityAnimations[index].isVisible ? 0.1 : 0 
              }}
            >
              <ActivityIcon><Icon icon={activity.icon} /></ActivityIcon>
              <ActivityTitle>{activity.title}</ActivityTitle>
              <ActivityMeta>
                <Icon icon={FaCalendarAlt} /> {activity.date}
              </ActivityMeta>
              <ActivityMeta>
                <Icon icon={FaMapMarkerAlt} /> {activity.location}
              </ActivityMeta>
              <ActivityDescription>{activity.description}</ActivityDescription>
              <ActivityHighlights>
                {activity.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ActivityHighlights>
            </ActivityCard>
          ))}
        </Grid>
      </Container>
    </ActivitiesSection>
  );
};

export default Activities; 