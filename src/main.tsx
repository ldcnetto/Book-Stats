import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './components/HeaderSearchBar/headerSearchBar.tsx';
import SearchBooks from './services/SearchBooks.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex flex-row w-full">
      <div className="flex flex-col max-w-[50%]">
        <App />
      </div>
      <div className="max-w-[50%] w-full"></div>
    </div>
  </StrictMode>,
);
