import React from 'react';
import { Button } from '@mui/material';

export const BusAiButton = () => {
  return (
    <Button
      variant="contained" // For a solid background
      style={{
        backgroundColor: '#FF66C8',
        borderRadius: 40,
        color: 'white',
        fontSize: 18,
        borderBottom: '4px #CC0083 solid',
        fontFamily: 'Bricolage Grotesque', // Assuming you have this font imported
        fontWeight: 700,
        lineHeight: '25.60px',
        display: 'flex', // Inline-flex for side-by-side content
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}
    >
      Swap Points
    </Button>
  );
};

