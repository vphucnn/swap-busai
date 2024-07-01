// ** MUI Imports
import { Box, Typography, styled } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
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



const TableHistorySwap = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(10);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { user } = useAuth()


  useEffect(() => {

    setPageSize(pageSize)
    const fetchData = async () => {
      // setIsLoading(true);
      // setError(null);
      try {
        const response = await API.getTask(page, pageSize, true)
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

    fetchData();
  }, [page, pageSize, user]);

  return (
    <Box sx={{ background: "#726FF7", width: '1350px', maxWidth: '95vw', margin: 'auto', marginBottom: '5rem', borderRadius: '64px' }}>
      {data && <TableContainer sx={{ overflowX: 'auto', background: "#726FF7", borderRadius: '64px 64px 0px 0px' }} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }}>
                <Typography variant="tableHeader" sx={{ fontSize: { lg: '32px', xs: '16px' } }}>
                  Date
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }} align='right'>
                <Typography variant="tableHeader" sx={{ fontSize: { lg: '32px', xs: '16px' } }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }} align='right'>
                <Typography variant="tableHeader" sx={{ fontSize: { lg: '32px', xs: '16px' } }}>
                  Swap Points
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
                <TableCell component='th' scope='row' sx={{ width: "33%", borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem', }}>
                  <Typography variant="body1" sx={{ color: 'white', fontSize: { lg: '18px', xs: '14px' } }} >
                    {row.timeShare ? formatDateddmmyyyyhhmm(row?.time?.end_generate) : null}
                  </Typography>
                </TableCell>
                <TableCell align='right' sx={{ width: "33%", borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem', fontSize: { lg: '18px', xs: '14px' } }} >  <Typography variant="body1" sx={{ color: 'white' }} >
                  {row?.shareStatus?.toString() === 'true' ? 'successful' : 'false'}
                </Typography></TableCell>
                <TableCell align='right' sx={{ width: "33%", borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem', }}> <Typography variant="body1" sx={{ color: 'white', fontSize: { lg: '18px', xs: '14px' } }} >
                  {row.sharePoint}
                </Typography></TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
        {
          (!data || data.length < 1) &&
          <Box  sx={{ display: 'flex', flexDirection: "column", marginTop: '3rem', justifyContent: 'center', gap: '1rem' }}>
            <Box>
              <Img src={'/images/general/quiet.png'} />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ color: 'white', fontSize: { lg: '18px', xs: '14px' } }} >
                Seems a little quiet over here
              </Typography>
            </Box>
          </Box>

        }
      </TableContainer>}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PageIndicator setPage={setPage} currentPage={page} totalPages={totalPages} />
      </Box>

    </Box>

  )
}

export default TableHistorySwap



const Img = styled('img')(({ theme }) => ({
  maxWidth: "100%",
  borderRadius: '15px',
  width: "250px",
  ':hover': {
    transform: 'scale(1.2)', /* Zoom on hover */
    transition: 'transform 2s ease-in -out' /* Smooth transition */
  },
  [theme.breakpoints.down('lg')]: {
    marginTop: theme.spacing(5)
  },
  [theme.breakpoints.down('md')]: {
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(5)
  }
}))
