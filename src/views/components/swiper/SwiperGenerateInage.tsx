
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useCallback, useRef } from 'react';
import { BusAiButton } from 'src/@core/components/button/BusAiButton';
import { Pagination } from 'swiper/modules';

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
export const SwiperGenerateInage = () => {
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef?.current?.swiper.slideNext();
  }, []);

  return (
    <Box>
      <Box sx={{ margin: "auto", display: 'flex', maxWidth: '95vw', width: '400px', alignItems: 'center' }}>
        <IconButton aria-label="delete" sx={{ width: 20, height: 20, border: 1, borderRadius: '100%' }} onClick={handlePrev} >
          <ChevronLeftIcon />
        </IconButton >
        <Swiper
          pagination={{
            type: "bullets",
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          ref={sliderRef}
          loop
          autoplay={{
            stopOnLastSlide: false,
          }}
        >
          <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/box.png' alt='box' /></Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/box.png' alt='box' /></Box>
          </SwiperSlide> <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/box.png' alt='box' /></Box>
          </SwiperSlide> <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/box.png' alt='box' /></Box>
          </SwiperSlide> <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/box.png' alt='box' /></Box>
          </SwiperSlide>
        </Swiper>
        <IconButton aria-label="delete" sx={{ width: 20, height: 20, border: 1, borderRadius: '100%' }} onClick={handleNext}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '0.6rem' }}>
        <Typography variant="body1" sx={{}}>
          Share Your <b>Idea</b> To Earn <b>Busai</b>
        </Typography>
        <BusAiButton backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} onClick={() => {
          window.open('https://t.me/share/url?url=https://demo01-lac.vercel.app/images/general/panda.png&text=hello', '_blank', 'noopener,noreferrer');
        }} >Share</BusAiButton>
      </Box>
    </Box>
  );
};
