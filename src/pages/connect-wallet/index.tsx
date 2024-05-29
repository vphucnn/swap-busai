

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-material-ui';





export default function Page() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '3rem' }}>
      <Box>
        <Typography variant="h1">
          Connect solana wallet
        </Typography>
        <Typography variant="subtitle1">
          Please connect your Solana wallet
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <WalletMultiButton />
        <WalletDisconnectButton />
      </Box >
    </Box>
  )
}
