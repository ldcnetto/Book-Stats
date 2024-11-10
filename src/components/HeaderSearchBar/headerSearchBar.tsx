/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchResults([]);
      setSearchError(null);
      setSearchLoading(true);

      const fetchBooks = async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${debouncedSearchTerm}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`,
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
  }, [debouncedSearchTerm]);

  return (
    <Box sx={{ justifyContent: 'space-between' }}>
      <AppBar
        sx={{
          bgcolor: '#7839e8 !important',
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
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { sm: 'block' }, minWidth: '120px', mr: 2 }}
          >
            BookStats
          </Typography>

          <Search sx={{ width: '100% !important', maxWidth: '1000px' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ width: '100% !important' }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {searchLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {searchError && <div>Erro: {searchError}</div>}
      {!searchLoading && !searchError && searchResults && (
        <List>
          {searchResults.map((book) => (
            <ListItem key={book.id}>
              <ListItemText
                primary={book.volumeInfo.title}
                secondary={
                  book.volumeInfo.authors &&
                  `By: ${book.volumeInfo.authors.join(', ')}`
                }
                // tertiary={<img src={book.volumeInfo.imageLinks.thumbnail}}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
