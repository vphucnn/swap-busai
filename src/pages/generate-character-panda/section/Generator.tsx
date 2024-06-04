import { Box, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import { SwiperGenerateInage } from 'src/views/components/swiper/SwiperGenerateInage';
import FormPrompt from 'src/views/forms/form-validation/FormPrompt';
import DialogShowPanda from 'src/views/pages/dialog-examples/DialogShowPanda';

const Generator = () => {

  const [urlImg, setUrlImg] = useState<string>('/images/general/panda.png')
  const [show, setShow] = useState<boolean>(false)

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        background: 'linear-gradient(180deg, #CBFB45 0%, rgba(203, 251, 69, 0) 100%)',
        display: 'fex',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ maxWidth: '1400px' }}>
        <Box sx={{ marginTop: { xs: '50px', md: '120px' } }}>
          <Typography variant="h1" sx={{ fontWeight: 700 }}>
            Make Busai your true style
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ width: { xs: '100%', md: '60%' }, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Box>
              <Typography variant="body1" sx={{}}>
                Customizing Busai according to your ideas is simple, just write a detailed description in the box below. Share your achievements in Busai's community and receive surprising rewards
              </Typography>
            </Box>
            <Box >
              <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Pink flip flops' />
              <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Standing on 1 leg' />
              <Chip sx={{ margin: '10px 10px 10px 0px' }} label='stick out the tongue' />
              <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Red hat with a horn on it' />
              <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Jean Jacket with rocker style' />
              <Chip sx={{ margin: '10px 10px 10px 0px' }} label='Funny nerdy face' />
            </Box>
            <Box>
              <FormPrompt setShow={setShow} setUrlImg={setUrlImg} />
            </Box>
          </Box>
          <Box sx={{ maxWidth: '90vw', display: 'flex', width: { xs: '100%', md: '40%' }, position: 'relative', alignItems: 'center', gap: '1rem' }}>
            <Box sx={{ margin: "auto", display: 'flex', width: '400px', maxWidth: '100vw', alignItems: 'center', }}>
              <SwiperGenerateInage />
            </Box>
          </Box>
        </Box>
        <Box>
          <DialogShowPanda image={urlImg} show={show} setShow={setShow} />
        </Box>
      </Box>

    </Box>
  );
};

export default Generator;
