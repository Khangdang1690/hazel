import React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ 
  icon, 
  size = 16, 
  color, 
  className,
  style
}) => {
  // Create an instance of the icon component
  const IconComponent = icon as React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
  }>;
  
  return (
    <IconComponent 
      size={size} 
      color={color} 
      className={className} 
      style={{ display: 'inline', ...style }} 
    />
  );
};

export default Icon; 