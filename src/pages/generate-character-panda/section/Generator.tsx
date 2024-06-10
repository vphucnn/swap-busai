import { Box, Typography, styled } from '@mui/material';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';

// import { SwiperGenerateInage } from 'src/views/components/swiper/SwiperGenerateInage';
import FormPrompt from 'src/views/forms/form-validation/FormPrompt';

// import DialogShowPanda from 'src/views/pages/dialog-examples/DialogShowPanda';

// MUI Imports
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import FormRandom from 'src/views/forms/form-validation/FormRandom';
import { BusAiButton } from 'src/@core/components/button/BusAiButton';

const Generator = () => {

  const [urlImg, setUrlImg] = useState<string | null>(null)
  const [imageShare, setImageShare] = useState<string | null>(null)

  // const [show, setShow] = useState<boolean>(false)
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

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

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        background: 'linear-gradient(180deg, #CBFB45 0%, rgba(203, 251, 69, 0) 100%)',
        display: 'fex',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Box sx={{
        maxWidth: '1400px',
        width: "100%"
      }}>
        <Box sx={{ textAlign: 'center', marginTop: { xs: '1rem', md: '2rem' }, }}>
          <Typography sx={{ fontWeight: 700, typography: { lg: 'h1', xs: 'h3' } }}>
            Make Busai your true style
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: { xs: 'column', md: 'row' }, marginTop: { xs: '20px', md: '40px' }, }}>
          <Box sx={{ width: { xs: '100%', md: '60%' }, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Box>
              <TabContext value={value}>
                <TabList centered variant='fullWidth' onChange={handleChange} aria-label='simple tabs example'>
                  <Tab value='1' label='Custom Prompt' sx={{
                    fontSize: '22px',
                    fontWeight: 600,
                    lineHeight: '26.4px',
                    letterSpacing: '-0.5px'
                  }} />
                  <Tab value='2' label='Random Generator' sx={{
                    fontSize: '22px',
                    fontWeight: 600,
                    lineHeight: '26.4px',
                    letterSpacing: '-0.5px'
                  }} />
                </TabList>
                <TabPanel value='1' sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  <FormPrompt setUrlImg={setUrlImg} setImageShare={setImageShare} />
                </TabPanel>
                <TabPanel value='2' sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  <FormRandom setUrlImg={setUrlImg} />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', width: { xs: '100%', md: '40%' }, position: 'relative', alignItems: 'center', gap: '1rem' }}>
            <Box sx={{ margin: "auto", display: 'flex', width: '400px', maxWidth: '100vw', alignItems: 'center', }}>
              {/* <SwiperGenerateInage /> */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '0.6rem' }}>
                <Box>
                  <Box sx={{ width: 'fit-content', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '360px' }}>
                    {urlImg && <Img src={urlImg} alt='box' />}
                    {!urlImg && <Typography sx={{ fontWeight: 700, typography: { lg: 'body1', xs: 'body1' } }}>
                      Please create an image
                    </Typography>}
                  </Box>
                </Box>
                <Typography variant="body1" sx={{}}>
                  Share Your <b>Idea</b> To Earn <b>Busai</b>
                </Typography>
                <BusAiButton backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} onClick={() => {
                  if (imageShare) window.open(`https://t.me/share/url?url=${imageShare}`, '_blank', 'noopener,noreferrer');
                }} >Share</BusAiButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          {/* <DialogShowPanda image={urlImg} imageShare={imageShare} show={show} setShow={setShow} /> */}
        </Box>
      </Box>

    </Box >
  );
};

export default Generator;
