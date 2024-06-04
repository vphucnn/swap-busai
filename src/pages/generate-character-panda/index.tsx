

// import { useEffect } from 'react';

import Box from '@mui/material/Box';

// import NProgress from 'nprogress'
import { Typography } from '@mui/material';
import { useState } from 'react';

import DialogShowPanda from 'src/views/pages/dialog-examples/DialogShowPanda';

// import TableHistory from 'src/views/table/mui/TableHistory';
import TableReward from 'src/views/table/mui/TableReward';
import Generator from './section/Generator';
import InfoSection from './section/InfoSection';
import VideoSection from './section/VideSection';


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

   const [urlImg] = useState<string>('/images/general/panda.png')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <Generator />
      <InfoSection/>
      <VideoSection/>
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
