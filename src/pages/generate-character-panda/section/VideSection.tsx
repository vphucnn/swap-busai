import { Box, Typography } from '@mui/material';

const VideoSection = () => {
  return (
    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
    <Box>
      <Typography variant="h1" sx={{ fontWeight: 700 }}>
        How To be more creative with Busai?
      </Typography>
    </Box>
    <Box sx={{}}>
      <iframe
        id="video-demo-trailer-home-abc"
        style={{
          width: "800px",
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

    </Box>
  </Box>
  );
};

export default VideoSection;
