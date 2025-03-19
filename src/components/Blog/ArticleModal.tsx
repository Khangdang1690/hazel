import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaHashtag } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import Icon from '../shared/Icon';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

interface ArticleModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
`;

const ModalContainer = styled(motion.div)`
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 85vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    color: ${theme.colors.highlight};
  }
`;

const ArticleImage = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const ArticleContent = styled.div`
  padding: 2rem;
`;

const ArticleTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${theme.colors.text};
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${theme.colors.lightText};
  font-size: 0.9rem;
  gap: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background-color: ${theme.colors.primary}20;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ArticleBody = styled.div`
  line-height: 1.8;
  color: ${theme.colors.text};
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h3 {
    margin: 2rem 0 1rem;
    color: ${theme.colors.highlight};
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  blockquote {
    border-left: 3px solid ${theme.colors.highlight};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${theme.colors.lightText};
  }
  
  code {
    background-color: ${theme.colors.primary}20;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;  
  }
  
  pre {
    background-color: ${theme.colors.background};
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }
`;

const ArticleModal: React.FC<ArticleModalProps> = ({ post, isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && post && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <Icon icon={FaTimes} />
            </CloseButton>
            
            <ArticleImage bgImage={post.image} />
            
            <ArticleContent>
              <ArticleTitle>{post.title}</ArticleTitle>
              
              <ArticleMeta>
                <MetaItem>
                  <Icon icon={FaCalendarAlt} /> {post.date}
                </MetaItem>
                <MetaItem>
                  By {post.author}
                </MetaItem>
              </ArticleMeta>
              
              <TagsContainer>
                {post.tags.map((tag, index) => (
                  <Tag key={index}>
                    <Icon icon={FaHashtag} size={10} /> {tag}
                  </Tag>
                ))}
              </TagsContainer>
              
              <ArticleBody dangerouslySetInnerHTML={{ __html: post.content }} />
            </ArticleContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal; 