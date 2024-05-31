

// import { useEffect } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// import NProgress from 'nprogress'
import { Chip, Typography } from '@mui/material';
import { useState } from 'react';
import FormPrompt from 'src/views/forms/form-validation/FormPrompt';
import DialogShowPanda from 'src/views/pages/dialog-examples/DialogShowPanda';
import TableHistory from 'src/views/table/mui/TableHistory';

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
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <Box>
        <Typography variant="h1" sx={{ fontWeight: 700 }}>
          Make Busai your true style
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '60%' }}>
          <Box>
            <Typography variant="body1" sx={{}}>
              Customizing Busai according to your ideas is simple, just write a detailed description in the box below. Share your achievements in Busai's community and receive surprising rewards
            </Typography>
          </Box>
          <Box >
            <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Pink flip flops' />
            <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Standing on 1 leg' />
            <Chip sx={{ margin: '10px 10px 10px 0px' }} label='stick out the tongue' />
            <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Red hat with a horn on it' />
            <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Jean Jacket with rocker style' />
            <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Funny nerdy face' />
          </Box>
          <Box>
            <FormPrompt setShow={setShow} setUrlImg={setUrlImg} />

          </Box>
        </Box>
        <Box sx={{ width: '40%' }}>
          <Img src='/images/general/box.png' alt='box' />
        </Box>

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
