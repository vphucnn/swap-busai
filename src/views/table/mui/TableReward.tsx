// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Box, Pagination, Typography } from '@mui/material'
import PageIndicator from 'src/@core/components/pagination/PageIndicator'

const createData = (user: string, type: string, reward: number) => {
  return { user, type, reward }
}

const rows = [
  createData('05/07/2024 17:00', 'successful', 6.0),
  createData('01/07/2024 13:00', 'successful', 9.0),
  createData('01/07/2024 13:00', 'successful', 16.0),
  createData('01/07/2024 13:00', 'successful', 3.7),
  createData('01/07/2024 13:00', 'successful', 16.0)
]

const TableReward = () => {
  return (
    <Box sx={{ background: "#726FF7", marginBottom: '5rem', borderRadius: '64px' }}>
      <TableContainer sx={{ width: '1200px', maxWidth: '95vw', overflowX: 'auto', background: "#726FF7", borderRadius: '64px 64px 0px 0px' }} component={Paper}>
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
            {rows.map(row => (
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
      </TableContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PageIndicator currentPage={1}  totalPages={3}/>
      </Box>

    </Box>

  )
}

export default TableReward
