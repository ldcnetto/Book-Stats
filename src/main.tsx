import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { Layout } from './components/Layout/layout.tsx';
import GridItems from './components/GridItems/gridItems.tsx';
import Header from './components/Header/header.tsx';
import { Book } from './services/SearchBooks';
import GenreFilter from './components/Categories/categories.tsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShowCategories from './components/ShowCategories/showCategories.tsx';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [appDarkMode, setAppDarkMode] = useState(false);
  const [showGridItems, setShowGridItems] = useState(false); // Nova flag

  const handleDarkModeChange = (isDarkMode) => {
    setAppDarkMode(isDarkMode);
  };

  const isBigScreen = useMediaQuery('(min-width:580px)');

  // Função para controlar a exibição dos componentes
  const handleSearchResults = (results: Book[]) => {
    setBooks(results);
    setShowGridItems(results.length > 0); // Mostra GridItems se houver resultados
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header
        onSearchResults={handleSearchResults} // Passa a nova função
        onSearchLoading={setSearchLoading}
        onSearchError={setSearchError}
        onDarkModeChange={handleDarkModeChange}
      />
      {isBigScreen ? (
        <div style={{ marginBottom: '80px' }} />
      ) : (
        <div style={{ marginBottom: '100px' }} />
      )}

      <Layout>
        {showGridItems ? (
          <GridItems
            searchLoading={searchLoading}
            searchError={searchError}
            books={books}
            darkMode={appDarkMode}
          />
        ) : (
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <GenreFilter darkMode={appDarkMode} />
            <ShowCategories darkMode={appDarkMode} selectedGenre="Cookbooks" />
            <ShowCategories darkMode={appDarkMode} selectedGenre="Horror" />
            <ShowCategories darkMode={appDarkMode} selectedGenre="Fantasy" />
            <ShowCategories darkMode={appDarkMode} selectedGenre="Drama" />
            <ShowCategories darkMode={appDarkMode} selectedGenre="Poetry" />
            <ShowCategories darkMode={appDarkMode} selectedGenre="Biography" />
          </div>
        )}
      </Layout>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
