import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.css'; // Tailwind directives
import '@/assets/styles/global.css'; // Custom Africanfuturist styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);