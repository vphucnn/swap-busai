

// import { useEffect } from 'react';

import Box from '@mui/material/Box';

// import { styled } from '@mui/material/styles';

// import NProgress from 'nprogress'
import { Typography } from '@mui/material';

// import { CopyIcon } from 'src/views/components/copy-icon/CopyIcon';
import TableHistory from 'src/views/table/mui/TableHistory';

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
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
