import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaKaggle, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { Container, Section, SectionTitle, SectionSubtitle, Button } from '../../styles/common';
import Icon from '../shared/Icon';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const ContactSection = styled(Section)`
  background-color: ${theme.colors.background};
  padding: 8rem 0 5rem;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactText = styled.p`
  color: ${theme.colors.text};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${theme.colors.text};
  
  svg {
    color: ${theme.colors.highlight};
    font-size: 1.5rem;
  }
`;

const ContactItemText = styled.span`
  font-size: 1.1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.highlight};
    transform: translateY(-5px);
  }
`;

const ContactForm = styled.form`
  background-color: ${theme.colors.cardBackground};
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.primary};
  border-radius: 5px;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.main};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.highlight};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.primary};
  border-radius: 5px;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.main};
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.highlight};
  }
`;

const SubmitButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: rgba(107, 142, 35, 0.1);
  border: 1px solid ${theme.colors.secondary};
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  color: ${theme.colors.text};
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const titleAnimation = useScrollAnimation();
  const contactInfoAnimation = useScrollAnimation({ threshold: 0.1 });
  const formAnimation = useScrollAnimation({ threshold: 0.1 });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server here
    console.log(formData);
    
    // Show success message and reset form
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <ContactSection id="contact">
      <Container>
        <motion.div
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 20 }}
          animate={titleAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Get in Touch</SectionTitle>
          <SectionSubtitle>Connect with me for projects or collaborations</SectionSubtitle>
        </motion.div>
        
        <ContactContainer>
          <motion.div
            ref={contactInfoAnimation.ref}
            initial={{ opacity: 0, x: -30 }}
            animate={contactInfoAnimation.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactInfo>
              <ContactText>
                I'm always open to new opportunities, collaborations, and interesting data science projects. 
                Whether you have a question about my work, want to discuss a potential project, or just want to say hello, 
                feel free to reach out!
              </ContactText>
              
              <ContactItem>
                <Icon icon={FaEnvelope} />
                <ContactItemText>hazel.oak@example.com</ContactItemText>
              </ContactItem>
              
              <ContactItem>
                <Icon icon={FaMapMarkerAlt} />
                <ContactItemText>Boston, MA</ContactItemText>
              </ContactItem>
              
              <SocialLinks>
                <SocialLink href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <Icon icon={FaLinkedin} />
                </SocialLink>
                <SocialLink href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <Icon icon={FaGithub} />
                </SocialLink>
                <SocialLink href="https://kaggle.com/" target="_blank" rel="noopener noreferrer">
                  <Icon icon={FaKaggle} />
                </SocialLink>
              </SocialLinks>
            </ContactInfo>
          </motion.div>
          
          <motion.div
            ref={formAnimation.ref}
            initial={{ opacity: 0, x: 30 }}
            animate={formAnimation.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </FormGroup>
              
              <SubmitButton type="submit">
                Send Message <Icon icon={FaPaperPlane} />
              </SubmitButton>
              
              {isSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Thank you for your message! I'll get back to you soon.
                </SuccessMessage>
              )}
            </ContactForm>
          </motion.div>
        </ContactContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact; 