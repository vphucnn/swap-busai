// ** MUI Imports
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import RainBow from 'src/@core/components/svg/RainBow'

const StatsPoint = () => {
  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#FF66C8', padding: '2rem', borderRadius: { lg: '24px', xs: '12px' }, }}>
      <Box sx={{ position: 'absolute', right: -25, top: -35, zIndex: 10 }}>
        <RainBow />
      </Box>
      <Box>
        <Typography sx={{ typography: { lg: 'h3', xs: 'h4' }, color: '#CBFB45', textAlign: 'left' }}>
          Swap
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', borderRight: '1px solid #E1E1E1', width: '100%', padding: '0.5rem' }}>
          <Box>
            <Typography variant="body1" sx={{ textAlign: 'left', color: 'white', fontSize: { lg: '18px', xs: '14px' } }} >Music</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '0.5rem', textAlign: 'end' }}>
            <Typography sx={{ fontWeight: 500, fontSize: { lg: '32px', xs: '18px' }, color: '#CBFB45' }}>450</Typography>
            <Typography variant="body1" sx={{ color: 'white', fontSize: { lg: '18px', xs: '12px' } }} >points</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', borderRight: '1px solid #E1E1E1', width: '100%', padding: '0.5rem' }}>
          <Box>
            <Typography variant="body1" sx={{ textAlign: 'left', color: 'white', fontSize: { lg: '18px', xs: '12px' } }} >Generator</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '0.5rem', textAlign: 'end' }}>
            <Typography sx={{ fontWeight: 500, fontSize: { lg: '32px', xs: '18px' }, color: '#CBFB45' }}>450</Typography>
            <Typography variant="body1" sx={{ color: 'white', fontSize: { lg: '18px', xs: '12px' } }} >points</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', width: '100%', padding: '0.5rem' }}>
          <Box>
            <Typography variant="body1" sx={{ textAlign: 'left', color: 'white', fontSize: { lg: '18px', xs: '12px' } }} >Total</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '0.5rem', textAlign: 'end' }}>
            <Typography sx={{ fontWeight: 500, fontSize: { lg: '32px', xs: '18px' }, color: '#CBFB45' }}>450</Typography>
            <Typography variant="body1" sx={{ color: 'white', fontSize: { lg: '18px', xs: '12px' }, marginTop: 'auto' }} >points</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StatsPoint
