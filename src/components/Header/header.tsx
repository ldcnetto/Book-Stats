import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchBar, { Book } from '../../services/SearchBooks';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import useMediaQuery from '@mui/material/useMediaQuery';

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

  const isBigScreen = useMediaQuery('(min-width:580px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
      {' '}
      <AppBar
        position="static"
        sx={{
          bgcolor: appBarColor,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          position: 'fixed',
          zIndex: '1',
        }}
      >
        {isBigScreen ? (
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <QueryStatsIcon sx={{ color: iconColor }} />{' '}
              <h5 style={{ color: iconColor }}>BOOKSTATS</h5>
            </div>
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
        ) : (
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <QueryStatsIcon sx={{ color: iconColor }} />{' '}
                <h5 style={{ color: iconColor }}>BOOKSTATS</h5>
              </div>

              <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
                {' '}
                {/* Added edge prop */}
                {darkMode ? (
                  <LightModeIcon sx={{ color: iconColor }} />
                ) : (
                  <DarkModeIcon sx={{ color: iconColor }} />
                )}
              </IconButton>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '4px 0px 8px 0px',
                width: '100%',
              }}
            >
              <SearchBar
                onSearchResults={onSearchResults}
                onSearchLoading={onSearchLoading}
                onSearchError={onSearchError}
                darkMode={darkMode}
              />
            </div>
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
}
