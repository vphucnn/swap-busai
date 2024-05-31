

// import { useEffect } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// import NProgress from 'nprogress'
import { Button, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import { SwiperGenerateInage } from 'src/views/components/swiper/SwiperGenerateInage';
import FormPrompt from 'src/views/forms/form-validation/FormPrompt';
import DialogShowPanda from 'src/views/pages/dialog-examples/DialogShowPanda';

// import TableHistory from 'src/views/table/mui/TableHistory';
import TableReward from 'src/views/table/mui/TableReward';

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
      <Box sx={{ display: 'flex', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '60%' }, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
        <Box sx={{  maxWidth: '90vw', display: 'flex', width: { xs: '100%', md: '40%' }, position: 'relative', alignItems: 'center', gap: '1rem' }}>
          <Box sx={{ margin: "auto", display: 'flex', width: '400px', maxWidth: '100vw', alignItems: 'center', }}>
            <SwiperGenerateInage />
          </Box>
        </Box>
      </Box>
      <Box>
      </Box>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Box>
          <Typography variant="h1" sx={{ fontWeight: 700 }}>
            Create Music with AI and Earn Point
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: { xs: 'column', md: 'row' }, marginTop: '3rem' }}>
          <Box sx={{  maxWidth: '90vw', width: { xs: '100%', md: '40%' } }}>
            <Img src='/images/general/box.png' alt='box' />
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
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        <Box>
          <Typography variant="h1" sx={{ fontWeight: 700 }}>
            How To be more creative with Busai?
          </Typography>
        </Box>
        <Box sx={{}}>
          <iframe
            id="video-demo-trailer-home-abc"
            style={{
              width: "800px",
              maxWidth: "90vw",
              margin: "auto",
              aspectRatio: "16 / 9",
              border: 'none'
            }}
            src="https://www.youtube.com/embed/EuFrxnaFs6Q?si=uLqoV2Ieuhl3PKJW"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

        </Box>
      </Box>
      <Box>
        <DialogShowPanda image={urlImg} show={show} setShow={setShow} />
      </Box>

      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        <Box >
          <Typography variant="h1" sx={{ fontWeight: 700 }}>
            Your Reward
          </Typography>
        </Box>
        <TableReward />
      </Box>
    </Box>
  )
}
