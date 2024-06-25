// ** MUI Imports
import { Icon } from '@iconify/react'
import { Box, Theme, Typography, styled, useMediaQuery } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import NProgress from 'nprogress'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BusAiButton } from 'src/@core/components/button/BusAiButton'
import PageIndicator from 'src/@core/components/pagination/PageIndicator'
import { formatDateddmmyyyyhhmm } from 'src/@core/utils/format'
import API from 'src/api'
import { useAuth } from 'src/hooks/useAuth'

// const createData = (user: string, type: string, reward: number) => {
//   return { user, type, reward }
// }

// const rows = [
//   createData('05/07/2024 17:00', 'successful', 6.0),
//   createData('01/07/2024 13:00', 'successful', 9.0),
//   createData('01/07/2024 13:00', 'successful', 16.0),
//   createData('01/07/2024 13:00', 'successful', 3.7),
//   createData('01/07/2024 13:00', 'successful', 16.0)
// ]

const Img = styled('img')(({ theme }) => ({
  maxWidth: "95%",
  borderRadius: '15px',
  width: "250px",
  ':hover': {
    transform: 'scale(1.05)', /* Zoom on hover */
    transition: 'transform 2s ease-in -out' /* Smooth transition */
  },
  [theme.breakpoints.down('lg')]: {
    borderRadius: '5px',
    marginTop: theme.spacing(5)
  },
  [theme.breakpoints.down('md')]: {
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(5)
  }
}))

const TableHistory = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { updateProfile, user } = useAuth()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const callShareImage = async (id: string) => {
    try {
      NProgress.start()
      const response = await API.shareTelegram(id);
      NProgress.done()
      updateProfile()
      await fetchData()
      window.open(process.env.NEXT_PUBLIC_LINK_SHARE + '/' + response.data.data.message_id, '_blank');
    } catch (error: any) {
      NProgress.done()
      console.log(error?.response)
      toast.error(error?.response?.data?.message || 'Share error')
    }
  };

  const fetchData = async () => {
    // setIsLoading(true);
    // setError(null);
    try {
      const response = await API.getTask(page, pageSize)
      setData(response.data.data.data)
      setTotalPages(Math.ceil(response.data.data.total / 10))

      // setData(response.data.data)

      // setData(fetchedData);
    } catch (error) {
      // setError(error.message);
    } finally {
      // setIsLoading(false);
    }
  };


  useEffect(() => {
    setPageSize(pageSize || 10)
    fetchData();
  }, [page, pageSize]);

  return (
    <Box sx={{ background: "#726FF7", width: '1350px', maxWidth: '95vw', margin: 'auto', marginBottom: '5rem', borderRadius: { lg: '64px', xs: '20px' } }}>
      {data && <TableContainer sx={{ overflowX: 'auto', background: "#726FF7", borderRadius: { lg: '64px 64px 0px 0px', xs: '20px 20px 0px 0px' } }} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }}>
                <Typography variant="tableHeader" sx={{ fontSize: { lg: '32px', xs: '16px' } }}>
                  Image
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }}>
                <Typography variant="tableHeader" sx={{ fontSize: { lg: '32px', xs: '16px' } }}>
                  Date
                </Typography>
              </TableCell>
              {/* <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }} align='right'>
                <Typography variant="tableHeader" sx={{ fontSize: { lg: '32px', xs: '16px' } }}>
                  Status
                </Typography>
              </TableCell> */}
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }} align='right'>
                <Typography variant="tableHeader" sx={{ fontSize: { lg: '32px', xs: '16px' } }}>
                  Reward
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }} align='right'>
                <Typography variant="tableHeader" sx={{ fontSize: { lg: '32px', xs: '16px' } }}>
                  Share
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {data.map(row => (
              <TableRow
                key={row.user}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    paddingTop: '2rem'
                  },
                  '&:first-of-type td, &:first-of-type th': {
                    paddingTop: '2rem !important'
                  }
                }}
              >
                <TableCell component='th' scope='row' sx={{ minWidth: "150px", borderBottom: '1px solid rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '1rem', }}>
                  <Img src={API.getUrlImageMiniSizeById(row?._id)} alt='box' />
                </TableCell>
                <TableCell component='th' scope='row' sx={{ minWidth: "200px", borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem', }}>
                  <Typography variant="body1" sx={{ color: 'white', fontSize: { lg: '18px', xs: '14px' } }} >
                    {row?.time?.end_generate ? formatDateddmmyyyyhhmm(row?.time?.end_generate) : null}
                  </Typography>
                </TableCell>
                {/* <TableCell align='right' sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem' }} >  <Typography variant="body1" sx={{ color: 'white', fontSize: { lg: '18px', xs: '14px' } }} >
                  {row?.shareStatus?.toString() === 'true' ? 'successful' : 'false'}
                </Typography></TableCell> */}
                <TableCell align='right' sx={{ minWidth: "150px", borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem' }}>
                  <Typography variant="body1" sx={{ color: 'white' }} >
                    {row.sharePoint ? row.sharePoint : null}
                  </Typography>
                </TableCell>
                <TableCell align='right' sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem' }}>
                  {(user && user.checkProfile && user.checkProfile.status) ?

                    <>
                      <Box sx={{ maxWidth: '300px', margin: 'auto' }}>
                        {!row.sharePoint && <BusAiButton size={isMobile ? 'small' : 'medium'} sx={{ width: "100%", gap: '0.5rem', fontSize: isMobile ? '14px' : '18px', '&:hover': { borderBottom: '4px #CC0083  solid' } }} disabled={!row?._id} backgroundColor={'#FFD600'} borderBottom={'4px #e3a600 solid'} onClick={() => {
                          if (row?._id) callShareImage(row?._id)
                        }} >
                          <Icon icon='ic:baseline-telegram' fontSize={isMobile ? 20 : 30} />Share To Earn
                        </BusAiButton>}
                        <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'space-between' }}>
                          <BusAiButton size={isMobile ? 'small' : 'medium'} sx={{ width: "100%", gap: '0.5rem', fontSize: isMobile ? '14px' : '18px', '&:hover': { borderBottom: '4px #CC0083  solid' } }} disabled={!row?._id} backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} onClick={() => {
                            if (row?._id) window.open('https://www.facebook.com/sharer/sharer.php?u=' + API.getUrlImageById(row?._id), '_blank');

                          }} >
                            <Icon icon='ic:baseline-facebook' fontSize={isMobile ? 20 : 30} />Share
                          </BusAiButton>
                          <BusAiButton size={isMobile ? 'small' : 'medium'} sx={{ width: "100%", gap: '0.5rem', fontSize: isMobile ? '14px' : '18px', '&:hover': { borderBottom: '4px #CC0083  solid' } }} disabled={!row?._id} backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} onClick={() => {
                            if (row?._id) window.open(`https://x.com/intent/post?text=Dog, cat? No, now Panda ruled the world%0AThe great $BUSAI has arrive&url=` + API.getUrlImageById(row?._id), '_blank')
                          }} >
                            <Icon icon='ri:twitter-x-fill' fontSize={isMobile ? 18 : 25} />Share
                          </BusAiButton>
                        </Box>
                      </Box>
                    </>
                    : <BusAiButton sx={{ width: "100%" }} backgroundColor={'#726FF7'} borderBottom={'4px #0F0BC1 solid'} onClick={() => {

                      // setCheckStatus(true);
                      window.open('https://t.me/' + process.env.NEXT_PUBLIC_BOT_NAME, '_blank');
                    }} >Verify Your Account</BusAiButton>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PageIndicator setPage={setPage} currentPage={page} totalPages={totalPages} />
      </Box>
    </Box>
  )
}

export default TableHistory
