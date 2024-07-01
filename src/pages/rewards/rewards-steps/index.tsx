

// import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// import NProgress from 'nprogress'
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Img = styled('img')(({ theme }) => ({
  maxWidth: "100%",

  [theme.breakpoints.down('lg')]: {
    marginTop: theme.spacing(5)
  },
  [theme.breakpoints.down('md')]: {
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
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
      <Box>
        <Typography variant="h1">
          Event Create Character Panda
        </Typography>
      </Box>
      <Box>
        <Img src='/images/general/cb-image.png' alt='box' />
      </Box>
      <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="h2" sx={{ fontWeight: '700' }}>
          Steps to participate
        </Typography>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Typography variant="body1" sx={{ fontWeight: '700' }}>
            Step 1:
          </Typography>
          <Typography variant="body1" >
            Register information
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Typography variant="body1" sx={{ fontWeight: '700' }}>
            Step 2:
          </Typography>
          <Typography variant="body1" >
            Connect solana wallet
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Typography variant="body1" sx={{ fontWeight: '700' }}>
            Step 3:
          </Typography>
          <Typography variant="body1" >
            Generate character <b>panda</b>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Typography variant="body1" sx={{ fontWeight: '700' }}>
            Step 4:
          </Typography>
          <Typography variant="body1" >
            Complete missions and get rewards
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
        <Button variant="contained" onClick={() => {
          router.replace('/')
        }}>Start</Button>
      </Box >
    </Box>
  )
}
