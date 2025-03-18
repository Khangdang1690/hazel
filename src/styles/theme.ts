export const theme = {
  colors: {
    background: '#16120F', // deep charcoal
    primary: '#8B4513', // saddle brown
    secondary: '#6B8E23', // olive drab
    text: '#F5F5DC', // beige
    highlight: '#CD853F', // peru/light brown
    lightText: '#F5F5DC99', // beige with opacity
    cardBackground: '#23201D' // slightly lighter than background
  },
  fonts: {
    main: "'Poppins', sans-serif",
    heading: "'Playfair Display', serif"
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px'
  },
  transitions: {
    default: '0.3s ease'
  }
};

export type Theme = typeof theme; 