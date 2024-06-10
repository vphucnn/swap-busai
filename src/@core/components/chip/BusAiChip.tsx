import { Chip, ChipProps } from '@mui/material';
import React from 'react';


interface BusAiChipProps extends ChipProps {
  label: string
}
export const BusAiChip : React.FC<BusAiChipProps> = ({label,  ...props}) => {
  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: 'white', // Custom background color
        color: '#111111', // Custom text color
        borderRadius: 5, // Custom border radius
        fontSize: 16, // Custom font size
        fontWeight: 400, // Custom font weight
        '& .MuiChip-deleteIcon': { // Target delete icon styles
          color: 'grey',
        }
      }}
      {...props}
    />
  );
};

