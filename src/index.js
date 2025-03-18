import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);