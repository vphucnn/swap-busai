import { Box, Typography } from '@mui/material';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { SwiperGenerateInage } from 'src/views/components/swiper/SwiperGenerateInage';
import FormPrompt from 'src/views/forms/form-validation/FormPrompt';
import DialogShowPanda from 'src/views/pages/dialog-examples/DialogShowPanda';

// MUI Imports
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import FormRandom from 'src/views/forms/form-validation/FormRandom';

const Generator = () => {

  const [urlImg, setUrlImg] = useState<string>('/images/general/panda.png')
  const [imageShare, setImageShare] = useState<string>('/images/general/panda.png')

  const [show, setShow] = useState<boolean>(false)
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

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
                <TabPanel value='1' sx={{ paddingLeft: 0, paddingRight: 0}}>
                  <FormPrompt setShow={setShow} setUrlImg={setUrlImg} setImageShare={setImageShare}/>
                </TabPanel>
                <TabPanel value='2' sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  <FormRandom setShow={setShow} setUrlImg={setUrlImg} />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', width: { xs: '100%', md: '40%' }, position: 'relative', alignItems: 'center', gap: '1rem' }}>
            <Box sx={{ margin: "auto", display: 'flex', width: '400px', maxWidth: '100vw', alignItems: 'center', }}>
              <SwiperGenerateInage />
            </Box>
          </Box>
        </Box>
        <Box>
          <DialogShowPanda image={urlImg}  imageShare={imageShare} show={show} setShow={setShow} />
        </Box>
      </Box>

    </Box >
  );
};

export default Generator;
