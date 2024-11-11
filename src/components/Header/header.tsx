import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchBar, { Book } from '../../services/SearchBooks';

interface HeaderProps {
  onSearchResults: (books: Book[]) => void;
  onSearchLoading: (loading: boolean) => void;
  onSearchError: (error: string | null) => void;
  onDarkModeChange: (darkMode: boolean) => void; // Callback prop
}

export default function Header({
  onSearchResults,
  onSearchLoading,
  onSearchError,
  onDarkModeChange,
}: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Update body class and notify parent component
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    onDarkModeChange(darkMode); // Call the callback
  }, [darkMode, onDarkModeChange]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const iconColor = darkMode ? '#ffffff' : '#111111';
  const appBarColor = darkMode ? '#111111' : '#f5f5f5';

  return (
    <Box sx={{ flexGrow: 1 }}>
      {' '}
      <AppBar
        position="static"
        sx={{
          bgcolor: appBarColor,
          boxShadow: 'none',
          position: 'fixed',
          zIndex: '1',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {' '}
          <h5 style={{ color: iconColor }}>BOOKSTATS</h5>{' '}
          <SearchBar
            onSearchResults={onSearchResults}
            onSearchLoading={onSearchLoading}
            onSearchError={onSearchError}
            darkMode={darkMode}
          />
          <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
            {' '}
            {/* Added edge prop */}
            {darkMode ? (
              <LightModeIcon sx={{ color: iconColor }} />
            ) : (
              <DarkModeIcon sx={{ color: iconColor }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
