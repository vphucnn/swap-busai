

// import { useEffect } from 'react';

import Box from '@mui/material/Box';

// import { styled } from '@mui/material/styles';

// import NProgress from 'nprogress'
import {Typography } from '@mui/material';

// import { CopyIcon } from 'src/views/components/copy-icon/CopyIcon';
import TableHistory from 'src/views/table/mui/TableHistory';
import { Icon } from '@iconify/react';
import { BusAiButton } from 'src/@core/components/button/BusAiButton';
import { useRouter } from 'next/router';

// const Img = styled('img')(({ theme }) => ({
//   maxWidth: "100%",

//   [theme.breakpoints.down('lg')]: {
//     marginTop: theme.spacing(5)
//   },
//   [theme.breakpoints.down('md')]: {
//   },
//   [theme.breakpoints.up('lg')]: {
//     marginTop: theme.spacing(5)
//   }
// }))

export default function Page() {
  const router = useRouter()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1rem', marginTop: '3rem' }}>
      <Box sx={{ width: '100%', padding: '0.5rem', maxWidth: '1350px', display: 'flex', justifyContent: 'start' }}>
        <BusAiButton sx={{ gap: '0.5rem', '&:hover': { borderBottom: '4px #CC0083  solid' }, width: '50px', height: '50px', padding: '0px' }} backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} onClick={() => {
          router.push('/generate-character-panda')
        }} >          <Icon icon='icon-park-solid:back' fontSize={30} color="white" />
        </BusAiButton>
      </Box>
      <Box>
        <Typography sx={{ typography: { lg: 'h1', xs: 'h3' } }}>
          History
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'left', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1rem', }}>
        <TableHistory />
      </Box>
    </Box>
  )
}
