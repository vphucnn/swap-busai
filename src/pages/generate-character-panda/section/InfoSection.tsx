import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

const InfoSection = () => {
  return (
    <Box
      sx={{
        width: 1920,
        height: 722,
        backgroundColor: '#FFD600',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack direction="row" sx={{ flex: 1, alignItems: 'center' }}>
        <img
          src="/images/general/info-section-2.png"
          alt="Placeholder"
          width="100%" // Adjust width as needed
          height="auto"
        />
      </Stack>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Box>
          <Typography variant="h1" sx={{ fontWeight: 700 }}>
            Create Music with AI and Earn Point
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: { xs: 'column', md: 'row' }, marginTop: '3rem' }}>
          <Box sx={{ maxWidth: '90vw', width: { xs: '100%', md: '40%' } }}>
            <img src='/images/general/box.png' alt='box' />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '60%' } }}>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Culpa aliquip aute labore velit culpa culpa eiusmod ipsum eu. Officia dolor commodo quis qui ullamco dolor. Commodo ex ad et cillum laboris cillum cupidatat esse sunt dolore esse magna exercitation est veniam labore. Aliqua velit pariatur irure in labore reprehenderit occaecat.Amet qui eu voluptate nostrud proident esse exercitation fugiat Lorem ullamco qui mollit magna ad. Ex commodo magna ullamco laborum cupidatat irure quis excepteur velit est excepteur elit labore esse reprehenderit cupidatat et. Excepteur incididunt esse incididunt nisi non nisi nostru
            </Typography>
            <Button sx={{ marginTop: '1rem' }} type='submit' variant='contained'>
              Try it out
            </Button>

          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default InfoSection;
