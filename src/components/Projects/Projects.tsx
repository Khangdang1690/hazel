import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRegChartBar, FaPython, FaDatabase, FaRobot } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { Container, Section, SectionTitle, SectionSubtitle, Grid } from '../../styles/common';
import Icon from '../shared/Icon';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import HoverCard from '../shared/HoverCard';
import AnimatedText from '../shared/AnimatedText';

const ProjectsSection = styled(Section)`
  background-color: ${theme.colors.background};
  padding: 8rem 0 5rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 6rem 0 4rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4rem 0 3rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const ProjectImage = styled.div<{ bgImage: string }>`
  height: 200px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(22, 18, 15, 0.2), rgba(22, 18, 15, 0.8));
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 180px;
  }
`;

const ProjectTags = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  max-width: 70%;
  justify-content: flex-end;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 10px;
    right: 10px;
    gap: 5px;
  }
`;

const ProjectTag = styled.span`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4px 10px;
    font-size: 0.7rem;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.25rem;
  }
`;

const ProjectTitle = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: 0.75rem;
  font-size: 1.4rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const ProjectDescription = styled.p`
  color: ${theme.colors.lightText};
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }
`;

const ProjectFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 0.75rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

const ProjectTech = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 8px;
  }
`;

const TechIcon = styled.div`
  font-size: 1.2rem;
  color: ${theme.colors.highlight};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 10px;
  }
`;

const ProjectLink = styled.a`
  color: ${theme.colors.text};
  font-size: 1.2rem;
  
  &:hover {
    color: ${theme.colors.highlight};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 2rem;
    gap: 8px;
  }
`;

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${props => props.active ? theme.colors.highlight : 'transparent'};
  color: ${theme.colors.text};
  border: 2px solid ${props => props.active ? theme.colors.highlight : theme.colors.primary};
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${theme.colors.primary};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
  }
`;

const CodeSnippet = styled.div`
  background-color: #1e1a17;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #f5f5dc;
  overflow-x: auto;
  
  .comment { color: ${theme.colors.secondary}; }
  .keyword { color: ${theme.colors.highlight}; }
  .string { color: #6B8E23; }
  .function { color: #CD853F; }
  .number { color: #8B4513; }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.75rem;
    padding: 0.75rem;
  }
`;

const ResponsiveGrid = styled(Grid)`
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Project data
const projectsData = [
  {
    id: 1,
    title: "COVID-19 Data Analysis Dashboard",
    description: "Interactive visualization of COVID-19 statistics with time-series analysis and regional comparisons. Includes predictive modeling for case forecasting.",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    tags: ["Data Visualization", "Time-Series"],
    tech: ["python", "visualization", "machine-learning"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "visualization"
  },
  {
    id: 2,
    title: "Stock Market Sentiment Analysis",
    description: "NLP-based sentiment analysis of financial news and social media to predict stock market trends. Integrates with real-time data feeds.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    tags: ["NLP", "Finance"],
    tech: ["python", "machine-learning", "database"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "machine-learning"
  },
  {
    id: 3,
    title: "Housing Price Prediction Model",
    description: "Machine learning model to predict housing prices based on multiple factors. Includes feature engineering and model comparison.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    tags: ["Machine Learning", "Regression"],
    tech: ["python", "machine-learning"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "machine-learning"
  },
  {
    id: 4,
    title: "Customer Segmentation Analysis",
    description: "Cluster analysis for customer segmentation using K-means and hierarchical clustering. Includes interactive visualizations of customer segments.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    tags: ["Clustering", "Marketing"],
    tech: ["python", "visualization", "database"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "data-analysis"
  },
  {
    id: 5,
    title: "Social Media Trend Analyzer",
    description: "Real-time analysis of trending topics across social media platforms with interactive dashboards and alerts for emerging trends.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    tags: ["Social Media", "Real-time"],
    tech: ["python", "visualization", "database"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "visualization"
  },
  {
    id: 6,
    title: "Weather Pattern Prediction",
    description: "Time-series forecasting for weather patterns using LSTM neural networks. Includes integration with weather APIs and interactive map visualizations.",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80",
    tags: ["Time-Series", "Neural Networks"],
    tech: ["python", "machine-learning", "visualization"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "machine-learning"
  },
];

// Map of tech to icon components
const techIconMap = {
  "python": FaPython,
  "visualization": FaRegChartBar,
  "machine-learning": FaRobot,
  "database": FaDatabase
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const titleAnimation = useScrollAnimation();
  const filterAnimation = useScrollAnimation();
  
  // Create individual hooks for each project
  const project1Animation = useScrollAnimation({ threshold: 0.1 });
  const project2Animation = useScrollAnimation({ threshold: 0.1 });
  const project3Animation = useScrollAnimation({ threshold: 0.1 });
  const project4Animation = useScrollAnimation({ threshold: 0.1 });
  const project5Animation = useScrollAnimation({ threshold: 0.1 });
  const project6Animation = useScrollAnimation({ threshold: 0.1 });
  
  // Create mapping of project ID to its animation
  const projectAnimationsMap = {
    1: project1Animation,
    2: project2Animation,
    3: project3Animation,
    4: project4Animation,
    5: project5Animation,
    6: project6Animation
  };
  
  const filteredProjects = filter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  return (
    <ProjectsSection id="projects">
      <Container>
        <motion.div
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 20 }}
          animate={titleAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText 
            text="Projects Portfolio" 
            highlight={["Projects"]} 
            className={SectionTitle}
          />
          <SectionSubtitle>Data analysis case studies and interactive visualizations</SectionSubtitle>
        </motion.div>
        
        <motion.div
          ref={filterAnimation.ref}
          initial={{ opacity: 0, y: 20 }}
          animate={filterAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterContainer>
            <FilterButton 
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All Projects
            </FilterButton>
            <FilterButton 
              active={filter === "data-analysis"}
              onClick={() => setFilter("data-analysis")}
            >
              Data Analysis
            </FilterButton>
            <FilterButton 
              active={filter === "visualization"}
              onClick={() => setFilter("visualization")}
            >
              Visualizations
            </FilterButton>
            <FilterButton 
              active={filter === "machine-learning"}
              onClick={() => setFilter("machine-learning")}
            >
              Machine Learning
            </FilterButton>
          </FilterContainer>
        </motion.div>
        
        <ResponsiveGrid>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={projectAnimationsMap[project.id as keyof typeof projectAnimationsMap].ref}
              initial={{ opacity: 0, y: 30 }}
              animate={projectAnimationsMap[project.id as keyof typeof projectAnimationsMap].isVisible 
                ? { opacity: 1, y: 0 } 
                : { opacity: 0, y: 30 }
              }
              transition={{ 
                duration: 0.5, 
                delay: projectAnimationsMap[project.id as keyof typeof projectAnimationsMap].isVisible ? index * 0.1 : 0 
              }}
            >
              <HoverCard intensity={5}>
                <ProjectImage bgImage={project.image}>
                  <ProjectTags>
                    {project.tags.map((tag, i) => (
                      <ProjectTag key={i}>{tag}</ProjectTag>
                    ))}
                  </ProjectTags>
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  <ProjectFooter>
                    <ProjectTech>
                      {project.tech.map((tech, i) => (
                        <TechIcon key={i}>
                          {tech in techIconMap && (
                            <Icon icon={techIconMap[tech as keyof typeof techIconMap]} />
                          )}
                        </TechIcon>
                      ))}
                    </ProjectTech>
                    <ProjectLinks>
                      <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                        <Icon icon={FaGithub} />
                      </ProjectLink>
                      <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Icon icon={FaExternalLinkAlt} />
                      </ProjectLink>
                    </ProjectLinks>
                  </ProjectFooter>
                </ProjectContent>
              </HoverCard>
            </motion.div>
          ))}
        </ResponsiveGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 