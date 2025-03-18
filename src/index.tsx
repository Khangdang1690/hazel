import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IconContext } from 'react-icons';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <IconContext.Provider 
      value={{ 
        style: { display: 'inline' },
        // @ts-ignore: The following line helps TypeScript understand these are valid JSX elements
        attrs: { role: "img" } 
      }}
    >
      <App />
    </IconContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
