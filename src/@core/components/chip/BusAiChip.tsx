import { Icon } from '@iconify/react';
import { Box, Chip, ChipProps, IconButton } from '@mui/material';
import React from 'react';


interface BusAiChipProps extends ChipProps {
  label: string
  remove?: any
  showRemove?: boolean
}
export const BusAiChip: React.FC<BusAiChipProps> = ({ label, showRemove, remove, ...props }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Chip
        label={label}
        sx={{
          backgroundColor: 'white', // Custom background color
          color: '#111111', // Custom text color
          borderRadius: 5, // Custom border radius
          fontSize: 16, // Custom font size
          fontWeight: 400,

           // Custom font weight
          '& .MuiChip-deleteIcon': { // Target delete icon styles
            color: 'grey',
          },
          '& .MuiChip-label': { whiteSpace: 'normal' },
          height: 'auto'
        }}
        {...props}
      />
      {showRemove &&
        <Box sx={{ position: 'absolute', top: '-20px', right: '-20px' }}>
          <IconButton onClick={remove} aria-label="reload">
            <Icon icon='tabler:circle-minus' fontSize={25} />
          </IconButton>
        </Box>}
    </Box>
  );
};

