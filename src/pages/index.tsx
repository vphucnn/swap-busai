import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import FormSwapPoint from "src/views/swap/FormSwapPoint"
import StatsPoint from "src/views/swap/StatsPoint"
import TableHistorySwap from "src/views/table/mui/TableHistorySwap"


const Home = () => {
  return <Box sx={{
    width: '100%',
    height: '100%',
    backgroundImage: `url("images/background.svg")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingTop: '11rem'
  }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <Box sx={{ width: '996px', maxWidth: '95vw', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Box >
          <Typography sx={{ typography: { lg: 'h1', xs: 'h3' } }}>
            Swap
          </Typography>
        </Box>
        <StatsPoint />
        <FormSwapPoint/>
      </Box>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        <Box >
          <Typography sx={{ typography: { lg: 'h1', xs: 'h3' } }}>
            History
          </Typography>
        </Box>
        <TableHistorySwap />
      </Box>
    </Box>
  </Box>
}

export default Home
