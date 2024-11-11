/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import BasicRating from '../BasicRating/basicRating';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Grid from '@mui/material/Grid2';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'rgb(152,200,184, 0.25)',
  '&:hover': {
    backgroundColor: 'rgb(152,200,184, 0.45)',
  },
  borderRadius: '12px',
  marginRight: '12px',
  marginLeft: '12px',
  width: '100%',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function HeaderSearchAppBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = () => {
    if (debouncedSearchTerm) {
      setSearchResults([]);
      setSearchError(null);
      setSearchLoading(true);

      const fetchBooks = async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${debouncedSearchTerm}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY_2}&maxResults=21&orderBy=relevance&projection=full&startIndex=0`,
            // trasnformar o start index em uma função pra usar o pagination
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setSearchResults(data.items || []);
        } catch (error) {
          console.error('Error fetching books:', error);
          setSearchError(
            error instanceof Error ? error.message : String(error),
          );
        } finally {
          setSearchLoading(false);
        }
      };

      fetchBooks();
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ justifyContent: 'space-between' }}>
      <AppBar
        sx={{
          bgcolor: '#f1f1f1 !important',
          display: 'flex',
          width: '100% !important',
          alignItems: 'flex-start',
          position: 'relative',
        }}
      >
        <Toolbar
          sx={{
            width: '100% !important',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h5 className="flex !max-w-[100px]">BOOKSTATS</h5>

          <Search
            sx={{
              width: '100%',
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <IconButton>
              <SearchIcon sx={{ color: '#111111' }} onClick={handleSearch} />
            </IconButton>
            <StyledInputBase
              sx={{ width: '100%', color: '#111111' }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Search>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <DarkModeIcon sx={{ color: '#111111' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {searchLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {searchError && <div>Erro: {searchError}</div>}
      {!searchLoading && !searchError && searchResults && (
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            maxWidth: '1200px',
            margin: '20px auto',
            padding: '0',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {searchResults.map((book) => (
            <Grid
              key={book.id}
              xs={12} // Tamanho completo para mobile (1 coluna)
              sm={6} // 2 colunas para telas pequenas
              md={4} // 3 colunas para telas médias
              lg={3} // 4 colunas para telas grandes
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: '0 !important',
                height: '420px',
              }}
            >
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '0 !important',
                  height: '100%',
                  maxHeight: '500px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#f5f5f5',
                    height: '300px',
                    width: '300px',
                  }}
                >
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || ''}
                    alt={book.volumeInfo.title}
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </Box>
                <Box sx={{ width: '252px', marginTop: 1 }}>
                  <p className="flex">
                    <strong>{book.volumeInfo.title}</strong>
                  </p>
                  <p className="flex autor referencia">
                    {book.volumeInfo.authors &&
                      book.volumeInfo.authors.join(' · ')}
                  </p>
                  <BasicRating initialValue={book.volumeInfo.averageRating} />
                </Box>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
