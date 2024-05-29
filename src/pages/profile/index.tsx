

// import { useEffect } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useWallet } from '@solana/wallet-adapter-react';

// import NProgress from 'nprogress'
import { Typography } from '@mui/material';
import { CopyIcon } from 'src/views/components/copy-icon/CopyIcon';
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

  const { publicKey } = useWallet();


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
          Profile
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'left', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1rem',  }}>
        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: '700', wordBreak: 'break-all' }}>
            Address:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{wordBreak: 'break-all'}} >
              {publicKey?.toString()}
            </Typography>
            <Box>
              <CopyIcon text={publicKey?.toString() ? publicKey?.toString() : ''} />
            </Box>
          </Box>

        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: '700' }}>
            Email:
          </Typography>
          <Typography variant="body1" >
            user@gmail.com
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '3rem', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '3rem' }}>
            <Img src={'/images/general/panda.png'} alt="Girl in a jacket" width="200" />
          </Box>
          <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem',  margin: 'auto' }}>
            <Typography variant="h4" sx={{ fontWeight: '700' }}>
              Panda Lezen II
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Typography variant="body1" sx={{ fontWeight: '700' }}>
                  Type:
                </Typography>
                <Typography variant="body1" >
                  S
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Typography variant="body1" sx={{ fontWeight: '700' }}>
                  Reward:
                </Typography>
                <Typography variant="body1" >
                  220
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <TableHistory />
      </Box>
    </Box>
  )
}
