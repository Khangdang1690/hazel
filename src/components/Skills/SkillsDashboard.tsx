import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { theme } from '../../styles/theme';
import { SectionTitle, SectionSubtitle, Card, Container, Section, Grid } from '../../styles/common';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import AnimatedText from '../shared/AnimatedText';

const SkillsSection = styled(Section)`
  background-color: ${theme.colors.background};
  padding: 8rem 0 5rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 6rem 0 4rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4rem 0 3rem;
  }
`;

const ChartContainer = styled(motion.div)`
  height: 400px;
  margin-bottom: 2rem;
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 350px;
    padding: 1.25rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 300px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const SkillCategories = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 0.5rem;
    margin-bottom: 0.8rem;
  }
`;

const CategoryButton = styled.button<{ active: boolean }>`
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

const ChartTitle = styled.h3`
  color: ${theme.colors.highlight};
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 3rem 0;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 2rem 0;
  }
`;

const StatCard = styled(motion.div)`
  background-color: ${theme.colors.cardBackground};
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.highlight};
  margin-bottom: 0.5rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.2rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    margin-bottom: 0.3rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

// Programming Languages Data
const languagesData = [
  { name: 'Python', value: 90 },
  { name: 'R', value: 85 },
  { name: 'JavaScript', value: 70 },
  { name: 'SQL', value: 80 },
  { name: 'Java', value: 60 },
  { name: 'TypeScript', value: 65 },
];

// Data Science Tools Data
const toolsData = [
  { name: 'Pandas', value: 95 },
  { name: 'NumPy', value: 90 },
  { name: 'Scikit-learn', value: 85 },
  { name: 'TensorFlow', value: 75 },
  { name: 'PyTorch', value: 70 },
  { name: 'D3.js', value: 80 },
];

// Visualization Tools Data
const visualizationData = [
  { name: 'Tableau', value: 85 },
  { name: 'Power BI', value: 80 },
  { name: 'Matplotlib', value: 90 },
  { name: 'Seaborn', value: 85 },
  { name: 'Plotly', value: 75 },
  { name: 'ggplot2', value: 70 },
];

// Core Skills Data for Radar Chart (Oak Leaf Shape)
const coreSkillsData = [
  { subject: 'Data', A: 90 },
  { subject: 'ML', A: 85 },
  { subject: 'Stats', A: 80 },
  { subject: 'Viz', A: 95 },
  { subject: 'Big Data', A: 70 },
  { subject: 'Deep', A: 75 },
  { subject: 'NLP', A: 65 },
  { subject: 'Time', A: 80 },
];

const stats = [
  { value: '5+', label: 'Years' },
  { value: '30+', label: 'Projects' },
  { value: '15+', label: 'Viz' },
  { value: '10+', label: 'Models' },
];

const ResponsiveGrid = styled(Grid)`
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SkillsDashboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('languages');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    
    // Initial measurement
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Responsive chart sizing
  const getRadarChartSize = () => {
    if (windowWidth <= 480) return 45;
    if (windowWidth <= 768) return 55;
    if (windowWidth <= 1024) return 65;
    return 70;
  };
  
  const getTickFontSize = () => {
    if (windowWidth <= 480) return 8;
    if (windowWidth <= 768) return 9;
    return 10;
  };
  
  const getBarSize = () => {
    if (windowWidth <= 480) return 10;
    if (windowWidth <= 768) return 12;
    return 15;
  };
  
  const getYAxisWidth = () => {
    if (windowWidth <= 480) return 50;
    if (windowWidth <= 768) return 60;
    return 80;
  };
  
  const getMargin = () => {
    if (windowWidth <= 480) {
      return { top: 5, right: 10, bottom: 5, left: 0 };
    }
    if (windowWidth <= 768) {
      return { top: 5, right: 15, bottom: 5, left: 0 };
    }
    return { top: 5, right: 20, bottom: 5, left: 0 };
  };
  
  // Create scroll animation hooks
  const titleAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation({ threshold: 0.1 });
  const coreSkillsAnimation = useScrollAnimation({ threshold: 0.1 });
  const techSkillsAnimation = useScrollAnimation({ threshold: 0.1 });
  
  const getDataForCategory = () => {
    switch (activeCategory) {
      case 'languages':
        return languagesData;
      case 'tools':
        return toolsData;
      case 'visualization':
        return visualizationData;
      default:
        return languagesData;
    }
  };

  // Get data length for the active category
  const activeData = getDataForCategory();
  
  return (
    <SkillsSection id="skills" ref={containerRef}>
      <Container>
        <motion.div
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 20 }}
          animate={titleAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText 
            text="Skills" 
            highlight={["Skills"]} 
            className={SectionTitle}
          />
          <SectionSubtitle>Technical expertise</SectionSubtitle>
        </motion.div>
        
        <StatsContainer
          ref={statsAnimation.ref}
          initial={{ opacity: 0, y: 30 }}
          animate={statsAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsAnimation.isVisible 
                ? { opacity: 1, scale: 1 } 
                : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.3, delay: statsAnimation.isVisible ? 0.3 + (index * 0.1) : 0 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
        
        <ResponsiveGrid>
          <ChartContainer
            ref={coreSkillsAnimation.ref}
            initial={{ opacity: 0, x: -30 }}
            animate={coreSkillsAnimation.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ChartTitle>Core Skills</ChartTitle>
            <ChartWrapper>
              <ResponsiveContainer width="98%" height="95%">
                <RadarChart 
                  outerRadius={`${getRadarChartSize()}%`} 
                  data={coreSkillsData}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <PolarGrid />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ 
                      fill: theme.colors.text, 
                      fontSize: getTickFontSize(),
                    }} 
                    tickLine={false}
                  />
                  <Radar
                    name="Skill"
                    dataKey="A"
                    stroke={theme.colors.highlight}
                    fill={theme.colors.primary}
                    fillOpacity={0.6}
                    animationDuration={coreSkillsAnimation.isVisible ? 1500 : 0}
                    animationBegin={coreSkillsAnimation.isVisible ? 500 : 0}
                    isAnimationActive={true}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.colors.cardBackground, 
                      borderColor: theme.colors.primary, 
                      color: theme.colors.text,
                      fontSize: getTickFontSize(),
                      padding: '5px'
                    }}
                    itemStyle={{
                      fontSize: getTickFontSize(),
                      padding: '2px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </ChartContainer>
          
          <ChartContainer
            ref={techSkillsAnimation.ref}
            initial={{ opacity: 0, x: 30 }}
            animate={techSkillsAnimation.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ChartTitle>Tech Proficiency</ChartTitle>
            <SkillCategories
              initial={{ opacity: 0, y: 20 }}
              animate={techSkillsAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <CategoryButton 
                active={activeCategory === 'languages'}
                onClick={() => setActiveCategory('languages')}
              >
                Languages
              </CategoryButton>
              <CategoryButton 
                active={activeCategory === 'tools'}
                onClick={() => setActiveCategory('tools')}
              >
                Tools
              </CategoryButton>
              <CategoryButton 
                active={activeCategory === 'visualization'}
                onClick={() => setActiveCategory('visualization')}
              >
                Viz
              </CategoryButton>
            </SkillCategories>
            <ChartWrapper>
              <ResponsiveContainer width="98%" height="95%">
                <BarChart 
                  data={activeData} 
                  layout="vertical"
                  margin={getMargin()}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={`${theme.colors.primary}50`} 
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis 
                    type="number" 
                    tick={{ 
                      fill: theme.colors.text, 
                      fontSize: getTickFontSize() 
                    }} 
                    domain={[0, 100]} 
                    height={25}
                    tickCount={5}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ 
                      fill: theme.colors.text, 
                      fontSize: getTickFontSize()
                    }} 
                    width={getYAxisWidth()}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.colors.cardBackground, 
                      borderColor: theme.colors.primary, 
                      color: theme.colors.text,
                      fontSize: getTickFontSize(),
                      padding: '5px'
                    }}
                    itemStyle={{
                      fontSize: getTickFontSize(),
                      padding: '2px'
                    }}
                    cursor={{ fill: 'rgba(237, 188, 74, 0.1)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill={theme.colors.highlight} 
                    barSize={getBarSize()} 
                    radius={[0, 4, 4, 0]} 
                    animationDuration={techSkillsAnimation.isVisible ? 1500 : 0}
                    animationBegin={techSkillsAnimation.isVisible ? 500 : 0}
                    isAnimationActive={true}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </ChartContainer>
        </ResponsiveGrid>
      </Container>
    </SkillsSection>
  );
};

export default SkillsDashboard; 