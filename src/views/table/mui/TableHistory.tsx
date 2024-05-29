// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const createData = (user: string, type: string, reward: number) => {
  return { user, type, reward }
}

const rows = [
  createData('Frozen yoghurt', 'S', 6.0),
  createData('Ice cream sandwich', 'A', 9.0),
  createData('Eclair', 'B', 16.0),
  createData('Cupcake', 'AA', 3.7),
  createData('Gingerbread', 'C', 16.0)
]

const TableHistory = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '650px', maxWidth: '90vw' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align='right'>Type</TableCell>
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
              <TableCell align='right'>{row.reward}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableHistory
