import { Box, Typography } from '@mui/material';
import { SwiperInfo } from 'src/views/components/swiper/SwiperInfo';

const VideoSection = () => {
  return (
    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: {xs: '1rem', md: '3rem' ,lg:'5rem'} }}>
    <Box>
      <Typography  sx={{ typography: { lg: 'h1', xs: 'h3' }  }}>
        How To be more creative with Busai?
      </Typography>
    </Box>
    {/* <Box sx={{}}>
      <iframe
        id="video-demo-trailer-home-abc"
        style={{
          width: "900px",
          maxWidth: "90vw",
          margin: "auto",
          aspectRatio: "16 / 9.2",
          border: 'none',
          borderBottom: "10px black solid",
          borderRadius: '24px'
        }}
        src="https://www.youtube.com/embed/EuFrxnaFs6Q?si=uLqoV2Ieuhl3PKJW"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

    </Box> */}
    <SwiperInfo/>
  </Box>
  );
};

export default VideoSection;
