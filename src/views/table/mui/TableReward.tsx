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


  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      // setError(null);
      try {
        console.log("getTable")
        const response = await API.getTask(page, pageSize)
        console.log("getTable", response)

        // setData(fetchedData);
      } catch (error) {
        // setError(error.message);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ background: "#726FF7", width: '1200px', maxWidth: '95vw', margin: 'auto', marginBottom: '5rem', borderRadius: '64px' }}>
      {data && <TableContainer sx={{ overflowX: 'auto', background: "#726FF7", borderRadius: '64px 64px 0px 0px' }} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '2rem 0 1rem 0' }}>
                <Typography variant="tableHeader" >
                  Date
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '2rem 0 1rem 0' }} align='right'>
                <Typography variant="tableHeader" >
                  Status
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', textTransform: 'none', textAlign: 'center', padding: '2rem 0 1rem 0' }} align='right'>
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
                    {row.user}
                  </Typography>
                </TableCell>
                <TableCell align='right' sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem' }} >  <Typography variant="body1" sx={{ color: 'white' }} >
                  {row.user}
                </Typography></TableCell>
                <TableCell align='right' sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', padding: '1rem' }}>+   <Typography variant="body1" sx={{ color: 'white' }} >
                  {row.user}
                </Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PageIndicator currentPage={1} totalPages={3} />
      </Box>

    </Box>

  )
}

export default TableReward
