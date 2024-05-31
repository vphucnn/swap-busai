// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Box, Pagination } from '@mui/material'

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
    <Box sx={{ width: '1000px', maxWidth: '90vw', overflow: 'scroll' }}>
      <TableContainer component={Paper}>
        <Table  aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Reward</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row.user}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                <TableCell component='th' scope='row'>
                  {row.user}
                </TableCell>
                <TableCell align='right'>{row.type}</TableCell>
                <TableCell align='right'>+ {row.reward}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
        <Pagination count={6} />
      </Box>

    </Box>

  )
}

export default TableReward
