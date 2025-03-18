import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight, FaHashtag } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { Container, Section, SectionTitle, SectionSubtitle, Grid } from '../../styles/common';
import Icon from '../shared/Icon';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import ArticleModal from './ArticleModal';

const BlogSection = styled(Section)`
  background-color: ${theme.colors.background};
  padding: 8rem 0 5rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 6rem 0 4rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4rem 0 3rem;
  }
`;

const BlogCard = styled(motion.div)`
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BlogImage = styled.div<{ bgImage: string }>`
  height: 200px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 180px;
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.25rem;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.highlight};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
`;

const BlogTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.4rem;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`;

const BlogExcerpt = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1.25rem;
  }
`;

const BlogTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 6px;
    margin-bottom: 1.25rem;
  }
`;

const BlogTag = styled.span`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4px 10px;
    font-size: 0.7rem;
  }
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${theme.colors.highlight};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  align-self: flex-start;
  
  &:hover {
    color: ${theme.colors.secondary};
    
    svg {
      transform: translateX(5px);
    }
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const FeaturedPost = styled.div`
  margin-bottom: 3rem;
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 2rem;
  }
`;

const FeaturedImage = styled.div<{ bgImage: string }>`
  height: 300px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    height: auto;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 220px;
  }
`;

const FeaturedContent = styled.div`
  padding: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const FeaturedLabel = styled.div`
  background-color: ${theme.colors.highlight};
  color: ${theme.colors.text};
  display: inline-block;
  padding: 5px 15px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4px 12px;
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
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

const blogData: BlogPost[] = [
  {
    id: 1,
    title: "The Art and Science of Data Visualization",
    excerpt: "Exploring how effective data visualization combines design principles with statistical understanding to communicate insights clearly and compellingly.",
    content: `
      <p>Data visualization is both an art and a science. It combines statistical rigor with design principles to create visual representations that make complex data accessible and meaningful.</p>
      
      <h3>Why Data Visualization Matters</h3>
      
      <p>Humans are visual creatures. We process visual information faster and more effectively than text or numbers. A well-designed visualization can reveal patterns, trends, and outliers that might be missed in spreadsheets or reports.</p>
      
      <p>In today's data-driven world, the ability to create and interpret visualizations is becoming an essential skill across disciplines. From business intelligence to scientific research, effective data visualization is key to making informed decisions.</p>
      
      <h3>Principles of Effective Data Visualization</h3>
      
      <ul>
        <li><strong>Clarity</strong>: The visualization should clearly communicate the intended message without unnecessary complexity.</li>
        <li><strong>Accuracy</strong>: The visual representation must accurately reflect the underlying data without distortion.</li>
        <li><strong>Efficiency</strong>: Use the minimum amount of visual elements necessary to convey the information.</li>
        <li><strong>Aesthetics</strong>: While aesthetics shouldn't trump accuracy, an appealing design can enhance engagement and comprehension.</li>
      </ul>
      
      <blockquote>
        "The greatest value of a picture is when it forces us to notice what we never expected to see." — John Tukey
      </blockquote>
      
      <h3>Choosing the Right Visualization</h3>
      
      <p>Selecting the appropriate chart type is crucial. The choice depends on what you're trying to communicate:</p>
      
      <ul>
        <li>Comparing values across categories? Consider bar charts or column charts.</li>
        <li>Showing compositions or proportions? Pie charts or stacked bar charts might work.</li>
        <li>Illustrating trends over time? Line charts are often most effective.</li>
        <li>Displaying distributions? Histograms or box plots are designed for this purpose.</li>
        <li>Exploring relationships between variables? Scatter plots or heatmaps can reveal correlations.</li>
      </ul>
      
      <p>The field of data visualization continues to evolve with new tools and techniques. As data becomes increasingly central to our personal and professional lives, the ability to create meaningful visualizations will only grow in importance.</p>
    `,
    date: "June 15, 2023",
    author: "Alex Chen",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    tags: ["Data Visualization", "Design", "Statistics"],
    featured: true
  },
  {
    id: 2,
    title: "Machine Learning Models Explained",
    excerpt: "A beginner-friendly guide to understanding common machine learning algorithms and when to apply them to different types of problems.",
    content: `
      <p>Machine learning models can seem like mysterious black boxes, but they're based on understandable principles. This article breaks down common algorithms in simple terms.</p>
      
      <h3>Supervised Learning</h3>
      
      <p>Supervised learning is like teaching with examples. You provide the model with labeled data (inputs and correct outputs), and it learns to predict outputs for new inputs.</p>
      
      <p>Common supervised learning algorithms include:</p>
      
      <ul>
        <li><strong>Linear Regression</strong>: Predicts a continuous value based on input variables (like predicting house prices based on size, location, etc.)</li>
        <li><strong>Logistic Regression</strong>: Despite the name, this is for classification tasks, predicting which category something belongs to</li>
        <li><strong>Decision Trees</strong>: Make predictions by following a tree-like model of decisions</li>
        <li><strong>Random Forests</strong>: Combine multiple decision trees to improve accuracy</li>
        <li><strong>Support Vector Machines</strong>: Find the boundary that best separates different classes</li>
      </ul>
      
      <h3>Unsupervised Learning</h3>
      
      <p>Unsupervised learning works with unlabeled data, finding patterns and structures on its own.</p>
      
      <p>Key unsupervised learning approaches include:</p>
      
      <ul>
        <li><strong>Clustering</strong>: Groups similar data points together (K-means, hierarchical clustering)</li>
        <li><strong>Dimensionality Reduction</strong>: Simplifies data while preserving important information (PCA, t-SNE)</li>
        <li><strong>Anomaly Detection</strong>: Identifies unusual data points that don't fit the pattern</li>
      </ul>
      
      <blockquote>
        "Machine learning is like farming or gardening. Seeds are like algorithms, data is like soil, and the learned models are the plants." — Pedro Domingos
      </blockquote>
      
      <h3>Choosing the Right Model</h3>
      
      <p>The best model depends on your specific problem, the data available, and what you're trying to achieve. Consider:</p>
      
      <ul>
        <li>The type of problem (classification, regression, clustering)</li>
        <li>The size and quality of your dataset</li>
        <li>Interpretability requirements (some models are more explainable than others)</li>
        <li>Computational constraints</li>
      </ul>
      
      <p>Often, the simplest model that solves your problem is the best choice. This principle, known as Occam's Razor, helps avoid overfitting and creates more robust solutions.</p>
    `,
    date: "May 22, 2023",
    author: "Maria Lopez",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    tags: ["Machine Learning", "AI", "Algorithms"],
    featured: false
  },
  {
    id: 3,
    title: "Python Libraries Every Data Scientist Should Know",
    excerpt: "An overview of essential Python libraries that make data analysis, visualization, and machine learning workflows more efficient.",
    content: `
      <p>Python has become the lingua franca of data science, largely thanks to its rich ecosystem of specialized libraries. Here are the essential tools every data scientist should have in their toolkit.</p>
      
      <h3>Data Manipulation and Analysis</h3>
      
      <ul>
        <li><strong>NumPy</strong>: The foundation for numerical computing in Python, providing support for large, multi-dimensional arrays and matrices.</li>
        <li><strong>pandas</strong>: Offers data structures and operations for manipulating numerical tables and time series. The DataFrame object is particularly useful for data cleaning and preparation.</li>
      </ul>
      
      <h3>Data Visualization</h3>
      
      <ul>
        <li><strong>Matplotlib</strong>: The granddaddy of Python visualization libraries, providing a solid foundation for creating static, interactive, and animated visualizations.</li>
        <li><strong>Seaborn</strong>: Built on top of Matplotlib, it provides a higher-level interface for creating attractive statistical graphics.</li>
        <li><strong>Plotly</strong>: Creates interactive, publication-quality graphs with 3D plots, animations, and more.</li>
      </ul>
      
      <h3>Machine Learning</h3>
      
      <ul>
        <li><strong>scikit-learn</strong>: The most widely-used machine learning library, offering simple and efficient tools for data mining and data analysis.</li>
        <li><strong>TensorFlow</strong>: Google's open-source platform for machine learning, particularly popular for deep learning applications.</li>
        <li><strong>PyTorch</strong>: Facebook's alternative to TensorFlow, favored by many researchers for its dynamic computation graph.</li>
      </ul>
      
      <blockquote>
        "Python promises to become the lingua franca for data science, machine learning, and AI." — Wes McKinney, creator of pandas
      </blockquote>
      
      <h3>Special Purpose Libraries</h3>
      
      <ul>
        <li><strong>NLTK & spaCy</strong>: For natural language processing tasks.</li>
        <li><strong>StatsModels</strong>: For statistical modeling and hypothesis testing.</li>
        <li><strong>SciPy</strong>: For scientific and technical computing.</li>
        <li><strong>Dask</strong>: For parallel computing, handling datasets larger than memory.</li>
      </ul>
      
      <p>Mastering these libraries can dramatically improve your productivity as a data scientist. While you don't need to be an expert in all of them, familiarity with their capabilities helps you choose the right tool for each task.</p>
    `,
    date: "April 10, 2023",
    author: "David Kim",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80",
    tags: ["Python", "Data Science", "Libraries"],
    featured: false
  },
  {
    id: 4,
    title: "Ethics in Data Science: Navigating Bias and Privacy",
    excerpt: "Discussing the ethical considerations every data professional should be aware of, from recognizing bias in algorithms to protecting user privacy.",
    content: `
      <p>As data science becomes more influential in our society, ethical considerations have never been more important. Data scientists must navigate complex ethical issues around bias, privacy, and the societal impact of their work.</p>
      
      <h3>Algorithmic Bias</h3>
      
      <p>Algorithms can perpetuate and even amplify existing societal biases. This happens when training data contains historical biases or when the algorithm design itself has inherent flaws.</p>
      
      <p>Examples of algorithmic bias include:</p>
      <ul>
        <li>Facial recognition systems that perform poorly on certain demographic groups</li>
        <li>Hiring algorithms that favor certain types of candidates</li>
        <li>Credit scoring systems that disadvantage specific communities</li>
      </ul>
      
      <p>Mitigating bias requires diverse training data, careful algorithm design, and regular auditing of model outputs for fairness across different groups.</p>
      
      <h3>Data Privacy</h3>
      
      <p>With the growing amount of personal data being collected, privacy concerns have become paramount. Data scientists must consider:</p>
      
      <ul>
        <li>Informed consent: Do users understand what data is being collected and how it will be used?</li>
        <li>Data minimization: Are you collecting only what's necessary?</li>
        <li>Anonymization: Have identifiable elements been properly removed?</li>
        <li>Security: Is the data protected from unauthorized access?</li>
      </ul>
      
      <blockquote>
        "With great power comes great responsibility. This is especially true in data science where our decisions can affect thousands or millions of people." — DJ Patil
      </blockquote>
      
      <h3>Transparency and Explainability</h3>
      
      <p>As models become more complex, explaining how they arrive at decisions becomes harder. Yet transparency is crucial for building trust and allowing for meaningful oversight.</p>
      
      <p>Techniques for improving explainability include:</p>
      <ul>
        <li>Using interpretable models when possible</li>
        <li>Applying post-hoc explanation techniques for complex models</li>
        <li>Documenting model limitations and intended use cases</li>
      </ul>
      
      <p>Ethical data science requires ongoing reflection and a commitment to considering the broader impacts of our work. By embedding ethical considerations into every stage of the data science process, we can harness the power of data while avoiding potential harms.</p>
    `,
    date: "March 5, 2023",
    author: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    tags: ["Ethics", "Bias", "Privacy"],
    featured: false
  },
  {
    id: 5,
    title: "Time Series Analysis: Techniques and Applications",
    excerpt: "Exploring methods for analyzing time-dependent data, from classical statistical approaches to modern deep learning techniques.",
    content: `
      <p>Time series analysis is a specialized branch of statistics used to analyze data points collected or recorded in time order. From stock prices to weather patterns, time series data is all around us.</p>
      
      <h3>Classical Time Series Methods</h3>
      
      <p>Traditional approaches to time series analysis include:</p>
      
      <ul>
        <li><strong>Moving Averages</strong>: Smoothing techniques that help identify trends by averaging values over a window of time</li>
        <li><strong>Exponential Smoothing</strong>: Weighted averages where recent observations have more influence</li>
        <li><strong>ARIMA Models</strong>: Autoregressive Integrated Moving Average models capture temporal dependencies in the data</li>
        <li><strong>Seasonal Decomposition</strong>: Breaking down a time series into trend, seasonal, and residual components</li>
      </ul>
      
      <h3>Modern Approaches</h3>
      
      <p>Recent advances in machine learning have introduced powerful new tools:</p>
      
      <ul>
        <li><strong>Prophet</strong>: Facebook's forecasting tool that handles seasonality and holidays</li>
        <li><strong>LSTM Networks</strong>: A type of recurrent neural network well-suited for sequence prediction problems</li>
        <li><strong>Temporal Convolutional Networks</strong>: Adapted CNNs that capture temporal patterns</li>
        <li><strong>Transformer Models</strong>: Attention-based architectures that have shown promise in time series forecasting</li>
      </ul>
      
      <blockquote>
        "Prediction is very difficult, especially about the future." — Niels Bohr
      </blockquote>
      
      <h3>Practical Applications</h3>
      
      <p>Time series analysis powers many real-world applications:</p>
      
      <ul>
        <li>Economic forecasting and financial market prediction</li>
        <li>Demand forecasting for supply chain optimization</li>
        <li>Weather and climate modeling</li>
        <li>Energy load forecasting</li>
        <li>Anomaly detection in system monitoring</li>
      </ul>
      
      <p>The key to successful time series analysis is understanding both the statistical properties of your data and the specific requirements of your forecasting task. This includes accounting for seasonality, trend, cyclic patterns, and the appropriate level of uncertainty in your predictions.</p>
    `,
    date: "February 18, 2023",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    tags: ["Time Series", "Forecasting", "Statistics"],
    featured: false
  }
];

const DataBlog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const featuredPost = blogData.find(post => post.featured);
  const regularPosts = blogData.filter(post => !post.featured);
  
  const titleAnimation = useScrollAnimation();
  const featuredAnimation = useScrollAnimation({ threshold: 0.1 });
  
  // Create animation hooks for each regular post
  const post1Animation = useScrollAnimation({ threshold: 0.1 });
  const post2Animation = useScrollAnimation({ threshold: 0.1 });
  const post3Animation = useScrollAnimation({ threshold: 0.1 });
  const post4Animation = useScrollAnimation({ threshold: 0.1 });
  
  const postAnimations = [post1Animation, post2Animation, post3Animation, post4Animation];
  
  const handleOpenArticle = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <BlogSection id="blog">
      <Container>
        <motion.div
          ref={titleAnimation.ref}
          initial={{ opacity: 0, y: 20 }}
          animate={titleAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Data Blog & Insights</SectionTitle>
          <SectionSubtitle>Thoughts and learnings from my data science journey</SectionSubtitle>
        </motion.div>
        
        {featuredPost && (
          <motion.div
            ref={featuredAnimation.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={featuredAnimation.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FeaturedPost>
              <FeaturedImage bgImage={featuredPost.image} />
              <FeaturedContent>
                <FeaturedLabel>Featured Post</FeaturedLabel>
                <BlogMeta>
                  <Icon icon={FaCalendarAlt} /> {featuredPost.date}
                </BlogMeta>
                <BlogTitle>{featuredPost.title}</BlogTitle>
                <BlogExcerpt>{featuredPost.excerpt}</BlogExcerpt>
                <BlogTags>
                  {featuredPost.tags.map((tag, i) => (
                    <BlogTag key={i}>
                      <Icon icon={FaHashtag} size={10} /> {tag}
                    </BlogTag>
                  ))}
                </BlogTags>
                <ReadMoreButton onClick={() => handleOpenArticle(featuredPost)}>
                  Read Full Article <Icon icon={FaArrowRight} />
                </ReadMoreButton>
              </FeaturedContent>
            </FeaturedPost>
          </motion.div>
        )}
        
        <ResponsiveGrid>
          {regularPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              ref={postAnimations[index].ref}
              initial={{ opacity: 0, y: 30 }}
              animate={postAnimations[index].isVisible 
                ? { opacity: 1, y: 0 } 
                : { opacity: 0, y: 30 }
              }
              transition={{ 
                duration: 0.5, 
                delay: postAnimations[index].isVisible ? 0.1 : 0 
              }}
            >
              <BlogImage bgImage={post.image} />
              <BlogContent>
                <BlogMeta>
                  <Icon icon={FaCalendarAlt} /> {post.date}
                </BlogMeta>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogTags>
                  {post.tags.map((tag, i) => (
                    <BlogTag key={i}>
                      <Icon icon={FaHashtag} size={10} /> {tag}
                    </BlogTag>
                  ))}
                </BlogTags>
                <ReadMoreButton onClick={() => handleOpenArticle(post)}>
                  Read Full Article <Icon icon={FaArrowRight} />
                </ReadMoreButton>
              </BlogContent>
            </BlogCard>
          ))}
        </ResponsiveGrid>
        
        <ArticleModal 
          post={selectedPost} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </Container>
    </BlogSection>
  );
};

export default DataBlog; 