// ** MUI Imports
import { Box, Typography } from '@mui/material'
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



const TableReward = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);


  useEffect(() => {
    setPageSize(10)
    const fetchData = async () => {
      // setIsLoading(true);
      // setError(null);
      try {
        console.log("getTable")
        const response = await API.getTask(page, pageSize, true)
        console.log("getTable", response.data.data.data)
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
  }, [page, pageSize]);

  return (
    <Box sx={{ background: "#726FF7", width: '1200px', maxWidth: '95vw', margin: 'auto', marginBottom: '5rem', borderRadius: '64px' }}>
      {data && <TableContainer sx={{ overflowX: 'auto', background: "#726FF7", borderRadius: '64px 64px 0px 0px' }} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }}>
                <Typography variant="tableHeader" >
                  Date
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }} align='right'>
                <Typography variant="tableHeader" >
                  Status
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '3rem 0 2rem 0' }} align='right'>
                <Typography variant="tableHeader" >
                  Reward
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
                <TableCell component='th' scope='row' sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem', }}>
                  <Typography variant="body1" sx={{ color: 'white' }} >
                    {formatDateddmmyyyyhhmm(row.timeShare)}
                  </Typography>
                </TableCell>
                <TableCell align='right' sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem' }} >  <Typography variant="body1" sx={{ color: 'white' }} >
                  {row?.shareStatus?.toString() === 'true' ? 'successful' : 'false'}
                </Typography></TableCell>
                <TableCell align='right' sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem' }}> <Typography variant="body1" sx={{ color: 'white' }} >
                  {row.sharePoint}
                </Typography></TableCell>
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

export default TableReward
