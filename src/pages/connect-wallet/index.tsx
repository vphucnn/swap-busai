

import Box from '@mui/material/Box';
import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-material-ui';





export default function Page() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Box>
        <h1>Connect solana wallet</h1>
        <p>Please connect your Solana wallet</p>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <WalletMultiButton />
        <WalletDisconnectButton />
      </Box >
    </Box>
  )
}
