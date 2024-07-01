import { Box } from "@mui/system"

const Home = () => {
  return <Box sx={{
    width: '100%',
    height: '100%',
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundImage: `url("images/background.svg")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }}></Box>
}

export default Home
