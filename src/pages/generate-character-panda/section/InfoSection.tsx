import { Box, Typography } from '@mui/material';
import { BusAiButton } from 'src/@core/components/button/BusAiButton';

const InfoSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: '#FFD600',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/general/info-section-2.png)',
        backgroundSize: 'cover', // Ensures full coverage
        backgroundRepeat: 'no-repeat',
        padding: '20px'
      }}
    >
      <Box sx={{
        maxWidth: '1400px',
        textAlign: 'left', width: "100%"
        , display: 'flex', flexDirection: 'column', gap: '0.5rem',
        marginTop: '5rem', paddingBottom: '5rem'
      }}>
        <Box>
          <Typography  sx={{ fontWeight: 700 ,typography: { lg: 'h1', xs: 'h3' } }}>
            Create Music with AI and Earn Point
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: { xs: 'column', md: 'row' }, marginTop: '3rem' }}>

          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              Culpa aliquip aute labore velit culpa culpa eiusmod ipsum eu. Officia dolor commodo quis qui ullamco dolor. Commodo ex ad et cillum laboris cillum cupidatat esse sunt dolore esse magna exercitation est veniam labore. Aliqua velit pariatur irure in labore reprehenderit occaecat.Amet qui eu voluptate nostrud proident esse exercitation fugiat Lorem ullamco qui mollit magna ad. Ex commodo magna ullamco laborum cupidatat irure quis excepteur velit est excepteur elit labore esse reprehenderit cupidatat et. Excepteur incididunt esse incididunt nisi non nisi nostru
            </Typography>
            <BusAiButton sx={{ marginTop: '1rem' }} type='submit' variant='contained' backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} >
              Try it out
            </BusAiButton>
          </Box>
          <Box sx={{ maxWidth: '90vw', width: { xs: '100%', md: '50%' } }}>
            <img src='/images/general/pc.png' alt='box' />
          </Box>

        </Box>
      </Box>
    </Box >
  );
};

export default InfoSection;
