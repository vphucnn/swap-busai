

// import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// import NProgress from 'nprogress'
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(5)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(5)
  }
}))

export default function Page() {


  const router = useRouter()

  // function useDelayedCall(callback: any, delay: any) {
  //   useEffect(() => {
  //     const timeoutId = setTimeout(callback, delay);

  //     // Cleanup function to prevent memory leaks:
  //     return () => clearTimeout(timeoutId);
  //   }, [callback, delay]); // Dependency array ensures effect runs when dependencies change
  // }


  // useDelayedCall(() => NProgress.start(), 5000); // Delay by 2 seconds
  // useDelayedCall(() => NProgress.done(), 6000); // Delay by 2 seconds


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '3rem' }}>
      <Box>
        <Typography variant="h1">
          Event Create Character Panda
        </Typography>
      </Box>
      <Box>
        <Img src='/images/general/cb-image.png' alt='box' />
      </Box>
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="body1" sx={{ fontWeight: '700' }}>
          Event: Create Character Panda
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: '700' }}>
          Description:
        </Typography>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Typography variant="body1" sx={{ fontWeight: '700' }}>
            Purpose:
          </Typography>
          <Typography variant="body1" >
            To encourage creativity and character design skills within the community.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Typography variant="body1" sx={{ fontWeight: '700' }}>
            Content:
          </Typography>
          <Typography variant="body1" >
            Participants will have the opportunity to design their unique panda character using various drawing tools and graphic ...
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
        <Button variant="contained" onClick={() => {
          router.replace('/rewards-steps')
        }}>Join Now</Button>
      </Box >
    </Box>
  )
}
