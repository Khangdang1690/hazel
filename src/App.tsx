import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import ScrollProgress from './components/shared/ScrollProgress';
import CursorFollower from './components/shared/CursorFollower';

// Components
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import SkillsDashboard from './components/Skills/SkillsDashboard';
import Projects from './components/Projects/Projects';
import AcademicJourney from './components/Academic/AcademicJourney';
import Activities from './components/Activities/Activities';
import DataBlog from './components/Blog/DataBlog';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Pages
const Home = () => (
  <>
    <Hero />
    <SkillsDashboard />
    <Projects />
    <AcademicJourney />
    <Activities />
    <DataBlog />
    <Contact />
  </>
);

const SkillsPage = () => <SkillsDashboard />;
const ProjectsPage = () => <Projects />;
const AcademicPage = () => <AcademicJourney />;
const ActivitiesPage = () => <Activities />;
const BlogPage = () => <DataBlog />;
const ContactPage = () => <Contact />;

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile to disable custom cursor on touch devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <CursorFollower disabled={isMobile} />
        <ScrollProgress />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/academic" element={<AcademicPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
