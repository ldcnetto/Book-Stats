import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import BasicRating from '../BasicRating/basicRating';
import CropFreeTwoToneIcon from '@mui/icons-material/CropFreeTwoTone';
import { PieChart } from '@mui/x-charts/PieChart';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    averageRating?: number;
    imageLinks?: {
      thumbnail?: string;
    };
    categories?: string[];
    canonicalVolumeLink: string;
  };
}

const ratingColors = [
  '#FF5733', // Laranja avermelhado
  '#FFC670', // Amarelo dourado
  '#DAF7A6', // Verde claro
  '#3498DB', // Azul royal
  '#9B59B6', // Roxo
  '#E74C3C', // Vermelho
  '#27AE60', // Verde escuro
  '#F1C40F', // Amarelo mostarda
  '#8E44AD', // Roxo escuro
  '#2980B9', // Azul céu
  '#17A589', // Verde azulado
  '#D35400', // Laranja escuro
  '#C0392B', // Vermelho tijolo
  '#2C3E50', // Azul marinho
  '#7F8C8D', // Cinza
];

const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY_2;

export default function showCategories({
  darkMode,
  selectedGenre,
}: {
  darkMode: boolean;
  selectedGenre: string;
}) {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const isBigScreen = useMediaQuery('(min-width:580px)');
  const gridBackgroundColor = darkMode ? '#262829' : '#f5f5f5';

  useEffect(() => {
    const fetchBooks = async () => {
      if (selectedGenre) {
        setSearchLoading(true);
        setSearchError(null);
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${selectedGenre}&key=${apiKey}&maxResults=40&orderBy=relevance&projection=full&startIndex=0`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setFilteredBooks(data.items || []);
        } catch (error) {
          console.error('Error fetching books:', error);
          setSearchError(
            error instanceof Error ? error.message : String(error),
          );
        } finally {
          setSearchLoading(false);
        }
      } else {
        setFilteredBooks([]);
      }
    };
    fetchBooks();
  }, [selectedGenre]);

  const ratingCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  filteredBooks.forEach((book) => {
    const rating = book.volumeInfo.averageRating || 0;
    const roundedRating = Math.round(rating * 2) / 2; // Arredonda para o 0.5 mais próximo
    const index = roundedRating * 2 - 1; // Calcula índice para o array

    if (index >= 0 && index < ratingCounts.length) {
      ratingCounts[index]++;
    }
  });

  const pieChartData = ratingCounts.map((count, index) => ({
    id: index,
    value: count,
    label: `${(index + 1) / 2}`,
  }));

  return (
    <div>
      {isBigScreen ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            width: '100%',
          }}
        >
          <h3
            style={{
              display: 'flex',
              color: darkMode ? '#f5f5f5' : '#262829',
              margin: '40px 0 0 0',
            }}
          >
            {selectedGenre}
          </h3>
          <p
            style={{
              display: 'flex',
              color: darkMode ? '#f5f5f5' : '#262829',
              margin: '0 0 10px 0',
            }}
          >
            <strong
              style={{
                color: darkMode ? '#f5f5f5' : '#262829',
              }}
            >
              Estatísticas: distribuição das notas
            </strong>
          </p>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'red',
                  }}
                >
                  <p>Error: {searchError}</p>
                </Box>
              )}
              <Box
                sx={{
                  overflowX: 'scroll',
                  maxWidth: '100%',
                  display:
                    selectedGenre && !searchLoading && !searchError
                      ? 'flex'
                      : 'none',
                  flexDirection: 'row',
                  paddingBottom: '20px',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ mr: 2 }}>
                  {' '}
                  {filteredBooks.length > 0 && (
                    <PieChart
                      colors={ratingColors}
                      series={[
                        {
                          data: pieChartData,
                        },
                      ]}
                      width={400}
                      height={200}
                      sx={{
                        '& .MuiChartsAxis-root text': {
                          fill: darkMode ? '#fff' : '#fff',
                        },
                      }}
                    />
                  )}
                </Box>

                <div
                  style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}
                >
                  {filteredBooks.map((book) => (
                    <ListItem
                      key={book.id}
                      onClick={() => {
                        window.open(
                          book.volumeInfo.canonicalVolumeLink,
                          '_blank',
                        );
                      }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        padding: '0 !important',
                        maxWidth: '200px',
                        height: '100%',
                        maxHeight: '500px',
                        cursor: 'pointer',
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
                        <p style={{ display: 'flex', maxWidth: '200px' }}>
                          <strong
                            style={{
                              color: darkMode ? '#ffffff' : '#111111',
                              maxWidth: '200px',
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
                            style={{ color: darkMode ? '#ffffff' : '#111111' }}
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
                  ))}
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            width: '100%',
          }}
        >
          <h3
            style={{
              display: 'flex',
              color: darkMode ? '#f5f5f5' : '#262829',
              margin: '40px 0 0 0',
            }}
          >
            {selectedGenre}
          </h3>
          <p
            style={{
              display: 'flex',
              margin: '0 0 10px 0',
            }}
          >
            <strong
              style={{
                color: darkMode ? '#f5f5f5' : '#262829',
              }}
            >
              Estatísticas: distribuição das notas
            </strong>
          </p>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'red',
                  }}
                >
                  <p>Error: {searchError}</p>
                </Box>
              )}

              <Box sx={{ marginBottom: '20px' }}>
                {' '}
                {filteredBooks.length > 0 && (
                  <PieChart
                    colors={ratingColors}
                    series={[
                      {
                        data: pieChartData,
                      },
                    ]}
                    width={400}
                    height={200}
                    sx={{
                      '& .MuiChartsAxis-root text': {
                        fill: darkMode ? '#fff' : '#fff',
                      },
                    }}
                  />
                )}
              </Box>

              <Box
                sx={{
                  overflowX: 'scroll',
                  maxWidth: '100%',
                  display:
                    selectedGenre && !searchLoading && !searchError
                      ? 'flex'
                      : 'none',
                  flexDirection: 'row',
                  paddingBottom: '20px',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}
                >
                  {filteredBooks.map((book) => (
                    <ListItem
                      key={book.id}
                      onClick={() => {
                        window.open(
                          book.volumeInfo.canonicalVolumeLink,
                          '_blank',
                        );
                      }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        padding: '0 !important',
                        maxWidth: '200px',
                        height: '100%',
                        maxHeight: '500px',
                        cursor: 'pointer',
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
                        <p style={{ display: 'flex', maxWidth: '200px' }}>
                          <strong
                            style={{
                              color: darkMode ? '#ffffff' : '#111111',
                              maxWidth: '200px',
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
                            style={{ color: darkMode ? '#ffffff' : '#111111' }}
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
                  ))}
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
}
