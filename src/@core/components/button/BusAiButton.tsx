import React from 'react';
import { Button, ButtonProps } from '@mui/material';


interface BusAiButtonProps extends ButtonProps {
  backgroundColor: string,
  borderBottom: string,

}
export const BusAiButton : React.FC<BusAiButtonProps> = ({backgroundColor, borderBottom , ...props}) => {
  return (
    <Button
      {...props}
      variant="contained" // For a solid background
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: 40,
        color: 'white',
        fontSize: 18,
        borderBottom: borderBottom,
        fontFamily: 'Bricolage Grotesque', // Assuming you have this font imported
        fontWeight: 700,
        lineHeight: '25.60px',
        display: 'flex', // Inline-flex for side-by-side content
        justifyContent: 'center',
        alignItems: 'center',
        ...props.sx
      }}
    >
      {props.children}
    </Button>
  );
};

