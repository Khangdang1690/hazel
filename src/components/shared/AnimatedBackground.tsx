import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface CanvasProps {
  opacity: number;
}

const Canvas = styled.canvas<CanvasProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: ${props => props.opacity};
`;

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  alpha: number;
}

interface AnimatedBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  opacity?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  particleCount = 70,
  particleColor = theme.colors.highlight,
  opacity = 0.3
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: particleColor,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Check boundaries
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.alpha})`;
        ctx.fill();
        
        // Draw connections
        connectParticles(particle, index);
      });
    };
    
    const connectParticles = (particle: Particle, index: number) => {
      const maxDistance = 150;
      
      for (let j = index + 1; j < particles.current.length; j++) {
        const otherParticle = particles.current[j];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = 1 - (distance / maxDistance);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${hexToRgb(particle.color)}, ${opacity * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };
    
    const hexToRgb = (hex: string): string => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '255, 255, 255';
    };
    
    const animate = () => {
      drawParticles();
      requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount, particleColor]);
  
  return <Canvas ref={canvasRef} opacity={opacity} />;
};

export default AnimatedBackground; 