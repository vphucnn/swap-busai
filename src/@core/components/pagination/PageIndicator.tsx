import * as React from 'react';
import { Box, Typography, IconButton } from '@mui/material';

const PageIndicator = ({ setPage, currentPage, totalPages }: any) => {
  return (
    <Box sx={{ display: 'flex', gap: 5, alignItems: 'center', padding: '3rem' }}>
      <IconButton onClick={()=>{setPage(currentPage-1)}} sx={{ backgroundColor: '#CBFB45', borderRadius: '100%', borderBottom: '4px #6F9603 solid', width: '50px', height: '50px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>

          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4998 19.9201L8.97984 13.4001C8.20984 12.6301 8.20984 11.3701 8.97984 10.6001L15.4998 4.08008" stroke="#111111" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

        </Box>
      </IconButton>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 4 }}>
        <Typography sx={{ color: 'white', fontSize: 18, fontWeight: 400, lineHeight: 1.42 }}>Page</Typography>
        <Box sx={{
          backgroundColor: 'transparent',
          borderRadius: "8px",
          padding: '8px 24px',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          border: '1px solid white'
        }}>
          <Typography sx={{ color: 'white', fontSize: 18, fontWeight: 700, lineHeight: 1.42 }}>{currentPage}</Typography>
        </Box>
        <Typography sx={{ color: 'white', fontSize: 18, fontWeight: 400, lineHeight: 1.42 }}>of {totalPages}</Typography>
      </Box>
      <IconButton onClick={()=>{setPage(currentPage+1)}} sx={{ backgroundColor: '#CBFB45', borderRadius: '100%', width: '50px', height: '50px', borderBottom: '4px #6F9603 solid' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.41016 19.9201L15.9302 13.4001C16.7002 12.6301 16.7002 11.3701 15.9302 10.6001L9.41016 4.08008" stroke="#111111" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Box>
      </IconButton>
    </Box>
  );
};

export default PageIndicator;
