

// import { useEffect } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// import NProgress from 'nprogress'
import { Typography } from '@mui/material';
import { useState } from 'react';
import FormPrompt from 'src/views/forms/form-validation/FormPrompt';
import DialogShowPanda from 'src/views/pages/dialog-examples/DialogShowPanda';
import TableHistory from 'src/views/table/mui/TableHistory';

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



  // function useDelayedCall(callback: any, delay: any) {
  //   useEffect(() => {
  //     const timeoutId = setTimeout(callback, delay);

  //     // Cleanup function to prevent memory leaks:
  //     return () => clearTimeout(timeoutId);
  //   }, [callback, delay]); // Dependency array ensures effect runs when dependencies change
  // }


  // useDelayedCall(() => NProgress.start(), 5000); // Delay by 2 seconds
  // useDelayedCall(() => NProgress.done(), 6000); // Delay by 2 seconds


  // useEffect(() => {


  //   fetchData();
  // }, [])

  const [show, setShow] = useState<boolean>(false)

  const [urlImg, setUrlImg] = useState<string>('/images/general/panda.png')


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '3rem' }}>
      <Box>
        <Typography variant="h1">
          Generate character panda
        </Typography>
      </Box>
      <Box>
        <Img src='/images/general/box.png' alt='box' />
      </Box>
      <Box sx={{ textAlign: 'center', display: 'flex', gap: '0.5rem' }}>
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
          Your remaining quantity :
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'red' }}>
          (1/3)
        </Typography>

      </Box>
      <Box>
        <FormPrompt setShow={setShow} setUrlImg={setUrlImg} />
      </Box>
      <Box>
        <DialogShowPanda image={urlImg} show={show} setShow={setShow} />
      </Box>

      <Box>
        <TableHistory />
      </Box>
    </Box>
  )
}
