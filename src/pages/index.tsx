import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import TableHistorySwap from "src/views/table/mui/TableHistorySwap"


const Home = () => {
  return <Box sx={{
    width: '100%',
    height: '100%',
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundImage: `url("images/background.svg")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingTop: '11rem'
  }}>

    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>

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
