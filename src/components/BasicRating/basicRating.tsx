import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

interface BasicRatingProps {
  initialValue?: number | null;
}

export default function BasicRating({ initialValue = null }: BasicRatingProps) {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {initialValue !== null ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Rating
            name="read-only"
            value={initialValue}
            readOnly
            precision={0.5}
            sx={{ display: 'flex' }}
          />
          <p
            style={{
              color: '#DFDFDF',
              border: '1px solid',
              padding: '2px 4px 1px 4px',
            }}
            className="referencia"
          >
            <span style={{ color: '#111111' }}>{initialValue}</span>
          </p>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Rating name="disabled" value={null} disabled />
        </Box>
      )}
    </Box>
  );
}
