import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    averageRating?: number;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

interface SearchBarProps {
  onSearchResults: (books: Book[]) => void;
  onSearchLoading: (loading: boolean) => void;
  onSearchError: (error: string | null) => void;
  darkMode: boolean;
}

const Search = styled('div')(
  ({ theme, darkMode }: { theme: any; darkMode: boolean }) => ({
    position: 'relative',
    borderRadius: '12px',
    marginRight: '12px',
    marginLeft: '12px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '500px',
    transition: 'background-color 0.2s ease',
    backgroundColor: darkMode
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(152, 200, 184, 0.25)',
    '&:hover': {
      backgroundColor: darkMode
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(152, 200, 184, 0.45)',
    },
  }),
);

const StyledInputBase = styled(InputBase)(
  ({ theme, darkMode }: { theme: any; darkMode: boolean }) => ({
    color: darkMode ? '#ffffff' : '#111111',
    '& .MuiInputBase-input': {
      transition: theme.transitions.create('width', { duration: 0.2 }),
      width: '100%',
    },
  }),
);

export default function SearchBar({
  onSearchResults,
  onSearchLoading,
  onSearchError,
  darkMode,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (debouncedSearchTerm) {
      onSearchLoading(true);
      onSearchError(null);

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${debouncedSearchTerm}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY_2}&maxResults=21&orderBy=relevance&projection=full&startIndex=0`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        onSearchResults(data.items || []);
      } catch (error) {
        console.error('Error fetching books:', error);
        onSearchError(error instanceof Error ? error.message : String(error));
      } finally {
        onSearchLoading(false);
      }
    } else {
      onSearchResults([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Search darkMode={darkMode}>
      <IconButton>
        <SearchIcon
          sx={{ color: darkMode ? '#ffffff' : '#111111' }}
          onClick={handleSearch}
        />
      </IconButton>
      <StyledInputBase
        darkMode={darkMode}
        placeholder="Pesquisar…"
        sx={{ width: '90%' }}
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Search>
  );
}
