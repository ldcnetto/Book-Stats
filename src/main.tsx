import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { Layout } from './components/Layout/layout.tsx';
import GridItems from './components/GridItems/gridItems.tsx';
import Header from './components/Header/header.tsx';
import { Book } from './services/SearchBooks';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [appDarkMode, setAppDarkMode] = useState(false);

  const handleDarkModeChange = (isDarkMode) => {
    setAppDarkMode(isDarkMode);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header
        onSearchResults={setBooks}
        onSearchLoading={setSearchLoading}
        onSearchError={setSearchError}
        onDarkModeChange={handleDarkModeChange}
      />
      <div style={{ marginBottom: '80px' }} />
      <Layout>
        <GridItems
          searchLoading={searchLoading}
          searchError={searchError}
          books={books}
          darkMode={appDarkMode}
        />
      </Layout>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
