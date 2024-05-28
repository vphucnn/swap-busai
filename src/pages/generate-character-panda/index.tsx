

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import NProgress from 'nprogress'

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

export default function Page() {



  function useDelayedCall(callback: any, delay: any) {
    useEffect(() => {
      const timeoutId = setTimeout(callback, delay);

      // Cleanup function to prevent memory leaks:
      return () => clearTimeout(timeoutId);
    }, [callback, delay]); // Dependency array ensures effect runs when dependencies change
  }


  useDelayedCall(() => NProgress.start(), 5000); // Delay by 2 seconds
  useDelayedCall(() => NProgress.done(), 6000); // Delay by 2 seconds


return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Box>
        <h1>Generate character panda</h1>
        <p></p>
      </Box>
      <Box>
        <Img src='/images/general/box.png' alt='box' />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
        <Button variant="contained">Generate</Button>
      </Box >
    </Box>
  )
}
