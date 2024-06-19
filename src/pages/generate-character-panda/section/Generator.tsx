import { Box, Typography, styled } from '@mui/material';
import type { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';

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
import API from 'src/api';
import toast from 'react-hot-toast';
import NProgress from 'nprogress'
import { useAuth } from 'src/hooks/useAuth';
import { Icon } from '@iconify/react';

const Img = styled('img')(({ theme }) => ({
  maxWidth: "100%",
  borderRadius: '15px',
  width: "250px",
  [theme.breakpoints.down('lg')]: {
    marginTop: theme.spacing(5)
  },
  [theme.breakpoints.down('md')]: {
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(5)
  }
}))
const Generator = () => {

  const [urlImg, setUrlImg] = useState<string | null>(null)
  const [ImageId, setImageId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  const [shareStatus, setShareStatus] = useState<boolean>(false)
  const { updateProfile, user, loginTelegramCustom } = useAuth()

  // const [checkStatus, setCheckStatus] = useState<boolean>(false)

  // const [show, setShow] = useState<boolean>(false)
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }


  const callShareImage = async (id: string) => {
    if (!user) {
      return toast.error("You need to log in")
    }
    try {
      NProgress.start()
      const response = await API.shareTelegram(id);
      NProgress.done()
      setShareStatus(true)
      updateProfile()
      window.open(process.env.NEXT_PUBLIC_LINK_SHARE + '/' + response.data.data.message_id, '_blank');
    } catch (error) {
      NProgress.done()
      toast.error('Share error')
    }
  };

  const getShareImage = async () => {
    setUrlImg('/images/general/gen-default.png')

    try {
      const response = await API.getTask(1, 1, false)
      if (response?.data?.data?.data[0]?._id) {
        setImageId(response?.data?.data?.data[0]?._id)
        setUrlImg(API.getUrlImageMiniSizeById(response?.data?.data?.data[0]?._id))
      }
    } catch (error) {
      console.log(error)
    }
  };


  // useEffect(() => {
  //   if (checkStatus) {
  //     const interval = setInterval(checkProfile, 30000);

  //     return () => clearInterval(interval);
  //   }
  // }, [checkStatus]);

  // function checkProfile() {
  //   if (checkStatus) updateProfile()
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(user){
          const pending = await (await API.checkPending()).data.data
          if(pending){
            setIsLoading(true)
          }else{
              updateProfile()
              const response = await API.getTask(1, 1)
              if (response?.data?.data?.data[0]?._id) {
                setImageId(response?.data?.data?.data[0]?._id)
                setUrlImg(API.getUrlImageMiniSizeById(response?.data?.data?.data[0]?._id))
              }
              setIsLoading(false)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()

    const intervalId = setInterval(fetchData, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    if (ImageId) setShareStatus(false);
  }, [ImageId]);

  useEffect(() => {
    if (!urlImg) { getShareImage(); }

  }, [urlImg]);

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
          <Typography sx={{ typography: { lg: 'h1', xs: 'h3' } }}>
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
                  <FormPrompt setIsLoading={setIsLoading} isLoading={isLoading} setUrlImg={setUrlImg} setImageId={setImageId} />
                </TabPanel>
                <TabPanel value='2' sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  <FormRandom setIsLoading={setIsLoading} isLoading={isLoading} setUrlImg={setUrlImg} setImageId={setImageId} />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
          <Box sx={{ display: 'flex',  alignItems: 'flex-end', justifyContent:'center',   width: { xs: '100%', md: '40%' }, position: 'relative', gap: '1rem', paddingBottom: '1.5rem' }}>
            <Box sx={{  display: 'flex',   width: '400px', justifyContent: 'center', maxWidth: '100vw' }}>
              {/* <SwiperGenerateInage /> */}
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '0.6rem' }}>
                <Box>
                  <Box sx={{ width: 'fit-content', display: 'flex',  justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    {urlImg && !isLoading  &&  <Img src={urlImg} alt='box' />}
                    {isLoading  &&
                      <Box sx={{maxWidth: '98vw', borderRadius: '15px' , width: '250px', height: '250px' ,display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <Box className="loader">

                        </Box>
                      </Box>
                    }
                  </Box>
                </Box>
                <Typography variant="body1" sx={{}}>
                  Share Your <b>Idea</b> To Earn <b>Busai</b>
                </Typography>
                {(user && user.checkProfile && user.checkProfile.status) ?
                  <>
                    <BusAiButton sx={{ width: "100%", gap: '0.5rem', '&:hover': { borderBottom: '4px #CC0083  solid' } }} disabled={!ImageId || shareStatus || isLoading} backgroundColor={'#FFD600'} borderBottom={'4px #e3a600 solid'} onClick={() => {
                      if (ImageId) callShareImage(ImageId)
                    }} >
                      <Icon icon='ic:baseline-telegram' fontSize={30} />Share To Earn
                    </BusAiButton>
                    <Box   sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                      <BusAiButton sx={{ gap: '0.5rem', '&:hover': { borderBottom: '4px #CC0083  solid' } }} disabled={!ImageId || isLoading} backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} onClick={() => {
                        if (ImageId) window.open('https://www.facebook.com/sharer/sharer.php?u=' + API.getUrlImageById(ImageId), '_blank');

                      }} >
                        <Icon icon='ic:baseline-facebook' fontSize={30} />Share
                      </BusAiButton>
                      <BusAiButton sx={{ gap: '0.5rem', '&:hover': { borderBottom: '4px #CC0083  solid' } }} disabled={!ImageId || isLoading} backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} onClick={() => {
                        if (ImageId) window.open(`https://x.com/intent/post?text=Dog, cat? No, now Panda ruled the world%0AThe great $BUSAI has arrive&url=` + API.getUrlImageById(ImageId), '_blank')
                      }} >
                        <Icon icon='ri:twitter-x-fill' fontSize={25} />Share
                      </BusAiButton>
                    </Box>
                  </>
                  : <BusAiButton sx={{ width: "100%" }} backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} onClick={() => {
                    if(!user){
                      return loginTelegramCustom()
                    }

                    // setCheckStatus(true);
                    window.open('https://t.me/' + process.env.NEXT_PUBLIC_BOT_NAME, '_blank');
                  }} >Verify Your Account</BusAiButton>}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          {/* <DialogShowPanda image={urlImg} ImageId={ImageId} show={show} setShow={setShow} /> */}
        </Box>
      </Box>

    </Box >
  );
};

export default Generator;
