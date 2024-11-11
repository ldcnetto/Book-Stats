import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

interface BasicRatingProps {
  initialValue?: number | null;
  darkMode: boolean; // Add darkMode prop
}

export default function BasicRating({
  initialValue = null,
  darkMode,
}: BasicRatingProps) {
  const textColor = darkMode ? '#ffffff' : '#111111'; // Dynamic text color

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: textColor,
      }}
    >
      {initialValue !== null ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Rating
            name="read-only"
            value={initialValue}
            readOnly
            precision={0.5}
            sx={{
              display: 'flex',
              color: darkMode ? '#DFDFDF' : '',
            }}
          />
          <p
            style={{
              color: darkMode ? '#444444' : '#DFDFDF', // Dynamic border color
              border: '1px solid',
              padding: '2px 4px 1px 4px',
            }}
            className="referencia"
          >
            <span style={{ color: textColor }}>{initialValue}</span>{' '}
          </p>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: darkMode ? '#444444' : '#DFDFDF', // Dynamic border color
              border: '1px solid',
              padding: '2px 4px 1px 4px',
            }}
            className="referencia"
          >
            <span style={{ color: textColor }}>Sem Avaliação</span>{' '}
          </p>
        </Box>
      )}
    </Box>
  );
}
