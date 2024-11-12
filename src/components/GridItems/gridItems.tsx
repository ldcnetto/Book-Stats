import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid2'; // Correct import
import ListItem from '@mui/material/ListItem';
import BasicRating from '../BasicRating/basicRating';
import CropFreeTwoToneIcon from '@mui/icons-material/CropFreeTwoTone';
import { Book } from '../../services/SearchBooks';

interface GridItemsProps {
  searchLoading: boolean;
  searchError: string | null;
  books: Book[];
  darkMode: boolean;
}

export default function GridItems({
  searchLoading,
  searchError,
  books,
  darkMode,
}: GridItemsProps) {
  const gridBackgroundColor = darkMode ? '#262829' : '#f5f5f5';

  return (
    <>
      {searchLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '300px',
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {searchError && (
        <Box sx={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
          <p>Error: {searchError}</p>
        </Box>
      )}

      {!searchLoading && !searchError && books.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ display: 'flex' }}>
            <strong
              style={{
                color: darkMode ? '#ffffff' : '#111111',
              }}
              className="referencia"
            >
              Resultado de sua pesquisa
            </strong>
          </p>
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
            {books.map((book) => (
              <Grid
                key={book.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '0 !important',
                  height: '500px',
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
                      bgcolor: gridBackgroundColor,
                      height: '300px',
                      width: '200px',
                    }}
                  >
                    {book.volumeInfo.imageLinks?.thumbnail ? (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                      />
                    ) : (
                      <CropFreeTwoToneIcon
                        sx={{
                          fontSize: 80,
                          color: darkMode ? '#f5f5f5' : '#262829',
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: '200px',
                      marginTop: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <p style={{ display: 'flex' }}>
                      <strong
                        style={{
                          color: darkMode ? '#ffffff' : '#111111',
                        }}
                      >
                        {book.volumeInfo.title}
                      </strong>
                    </p>
                    <p
                      className="flex autor referencia"
                      style={{
                        display: 'flex',
                        color: darkMode ? '#bab1a3' : '#111111',
                      }}
                    >
                      <strong
                        style={{
                          color: darkMode ? '#ffffff' : '#111111',
                        }}
                      >
                        {book.volumeInfo.categories}
                      </strong>
                    </p>
                    <p
                      className="flex autor referencia"
                      style={{
                        display: 'flex',
                        color: darkMode ? '#bab1a3' : '#111111',
                      }}
                    >
                      {book.volumeInfo.authors &&
                        book.volumeInfo.authors.join(' · ')}
                    </p>
                    <BasicRating
                      darkMode={darkMode}
                      initialValue={book.volumeInfo.averageRating}
                    />
                  </Box>
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
