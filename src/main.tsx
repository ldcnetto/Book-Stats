import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './pages/App.tsx';
import SearchBooks from './services/SearchBooks.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex flex-col w-full">
      <App />
    </div>
  </StrictMode>,
);
