
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { IconButton } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useCallback, useRef } from 'react';
import IconBack from 'src/views/ui/icons/IconBack';
import IconNext from 'src/views/ui/icons/IconNext';

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

export const SwiperInfo = () => {
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
      <Box sx={{ margin: "auto", display: 'flex', maxWidth: '95vw', width: '1000px', alignItems: 'center'  }}>
        <IconButton aria-label="back" sx={{ }} onClick={handlePrev} >
          <IconBack />
        </IconButton >
        <Swiper

          modules={[]}
          className="mySwiper"
          ref={sliderRef}
          loop
          autoplay={{
            stopOnLastSlide: false,
          }}
        >
          <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/slides/01.png' alt='box' /></Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/slides/02.png' alt='box' /></Box>
          </SwiperSlide> <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/slides/03.png' alt='box' /></Box>
          </SwiperSlide> <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/slides/04.png' alt='box' /></Box>
          </SwiperSlide> <SwiperSlide>
            <Box sx={{ width: 'fit-content' }}> <Img src='/images/general/slides/05.png' alt='box' /></Box>
          </SwiperSlide>
        </Swiper>
        <IconButton aria-label="next" sx={{ }} onClick={handleNext}>
          <IconNext />
        </IconButton>
      </Box>
    </Box>
  );
};
