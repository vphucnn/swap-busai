// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Box, { BoxProps } from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Types
import { InvoiceLayoutProps, SingleInvoiceType } from 'src/types/apps/invoiceTypes'

// ** Third Party Components
import axios from 'axios'

// ** Configs
import BusAiLogo from 'src/@core/components/logo/BusAiLogo'

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))

const InvoicePrint = ({ id }: InvoiceLayoutProps) => {
  // ** State
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<null | SingleInvoiceType>(null)

  // ** Hooks
  const theme = useTheme()

  useEffect(() => {
    setTimeout(() => {
      window.print()
    }, 100)
  }, [])

  useEffect(() => {
    axios
      .get('/apps/invoice/single-invoice', { params: { id } })
      .then(res => {
        setData(res.data)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [id])

  if (data) {
    const { invoice, paymentDetails } = data

    return (
      <Box sx={{ p: 12, pb: 6 }}>
        <Grid container>
          <Grid item xs={8} sx={{ mb: { sm: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <BusAiLogo/>
                {/* <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
                  {themeConfig.templateName}
                </Typography> */}
              </Box>
              <div>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>Office 149, 450 South Brand Brooklyn</Typography>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>San Diego County, CA 91905, USA</Typography>
                <Typography sx={{ color: 'text.secondary' }}>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { sm: 'flex-end', xs: 'flex-start' } }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                {`Invoice #${invoice.id}`}
              </Typography>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography sx={{ mr: 3, color: 'text.secondary' }}>Date Issued:</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{invoice.issuedDate}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 3, color: 'text.secondary' }}>Date Due:</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{invoice.dueDate}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />

        <Grid container>
          <Grid item xs={7} md={8} sx={{ mb: { lg: 0, xs: 4 } }}>
            <Typography variant='h6' sx={{ mb: 3.5, fontWeight: 600 }}>
              Invoice To:
            </Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.name}</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.company}</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.address}</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.contact}</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{invoice.companyEmail}</Typography>
          </Grid>
          <Grid item xs={5} md={4}>
            <Typography variant='h6' sx={{ mb: 3.5, fontWeight: 600 }}>
              Bill To:
            </Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>Total Due:</MUITableCell>
                  <MUITableCell sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    {paymentDetails.totalDue}
                  </MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>Bank name:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>{paymentDetails.bankName}</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>Country:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>{paymentDetails.country}</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>IBAN:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>{paymentDetails.iban}</MUITableCell>
                </TableRow>
                <TableRow>
                  <MUITableCell sx={{ color: 'text.secondary' }}>SWIFT code:</MUITableCell>
                  <MUITableCell sx={{ color: 'text.secondary' }}>{paymentDetails.swiftCode}</MUITableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Divider sx={{ mt: theme => `${theme.spacing(6)} !important`, mb: '0 !important' }} />

        <Table sx={{ mb: 6 }}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>hours</TableCell>
              <TableCell>qty</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& .MuiTableCell-root': {
                py: `${theme.spacing(2.5)} !important`,
                fontSize: theme.typography.body1.fontSize
              }
            }}
          >
            <TableRow>
              <TableCell>Premium Branding Package</TableCell>
              <TableCell>Branding & Promotion</TableCell>
              <TableCell>48</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$32</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Social Media</TableCell>
              <TableCell>Social media templates</TableCell>
              <TableCell>42</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$28</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Web Design</TableCell>
              <TableCell>Web designing package</TableCell>
              <TableCell>46</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$24</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SEO</TableCell>
              <TableCell>Search engine optimization</TableCell>
              <TableCell>40</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$22</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Grid container>
          <Grid item xs={8} sm={7} lg={9}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Salesperson:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Tommy Shelby</Typography>
            </Box>

            <Typography sx={{ color: 'text.secondary' }}>Thanks for your business</Typography>
          </Grid>
          <Grid item xs={4} sm={5} lg={3}>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Subtotal:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$1800</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Discount:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$28</Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Tax:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>21%</Typography>
            </CalcWrapper>
            <Divider />
            <CalcWrapper>
              <Typography sx={{ color: 'text.secondary' }}>Total:</Typography>
              <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$1690</Typography>
            </CalcWrapper>
          </Grid>
        </Grid>

        <Divider sx={{ my: `${theme.spacing(6)} !important` }} />
        <Typography sx={{ color: 'text.secondary' }}>
          <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind for
          future freelance projects. Thank You!
        </Typography>
      </Box>
    )
  } else if (error) {
    return (
      <Box sx={{ p: 5 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Alert severity='error'>
              Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
              <Link href='/apps/invoice/list'>Invoice List</Link>
            </Alert>
          </Grid>
        </Grid>
      </Box>
    )
  } else {
    return null
  }
}

export default InvoicePrint
