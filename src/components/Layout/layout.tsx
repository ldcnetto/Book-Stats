import React from 'react';
import { styled } from '@mui/material/styles';

const LayoutContainerOut = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 20px',
  '@media (min-width: 1024px)': {
    margin: '0 160px',
  },
});

const LayoutContainerIn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '1200px',
  width: '100%',
});

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <LayoutContainerOut>
        <LayoutContainerIn>{children}</LayoutContainerIn>
      </LayoutContainerOut>
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}
