// ** React Imports
import { useEffect, useState, forwardRef, SyntheticEvent, ForwardedRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import { SelectChangeEvent } from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import axios from 'axios'
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { SingleInvoiceType, InvoiceClientType } from 'src/types/apps/invoiceTypes'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import CustomTextField from 'src/@core/components/mui/text-field'
import BusAiLogo from 'src/@core/components/logo/BusAiLogo'

interface Props {
  data: SingleInvoiceType
}

interface PickerProps {
  label?: string
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: { sm: '250px', xs: '170px' } }} />
})

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  '&:not(:last-child)': {
    paddingRight: `${theme.spacing(2)} !important`
  }
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-2.375rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('md')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  padding: theme.spacing(16, 10, 10),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(16)
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(10)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6)
  }
}))

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const EditCard = ({ data }: Props) => {
  // ** States
  const [count, setCount] = useState<number>(1)
  const [selected, setSelected] = useState<string>('')
  const [clients, setClients] = useState<InvoiceClientType[] | undefined>(undefined)
  const [selectedClient, setSelectedClient] = useState<InvoiceClientType | null>(null)
  const [dueDate, setDueDate] = useState<DateType>(data ? new Date(data.invoice.dueDate) : new Date())
  const [issueDate, setIssueDate] = useState<DateType>(data ? new Date(data.invoice.issuedDate) : new Date())

  // ** Hook
  const theme = useTheme()

  useEffect(() => {
    axios.get('/apps/invoice/clients').then(response => {
      if (response.data && clients === undefined) {
        setClients(response.data)
        setSelected(response.data[0].name)
        setSelectedClient(response.data[0])
      }
    })
  }, [clients])

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  // ** Handle Invoice To Change
  const handleInvoiceChange = (e: SelectChangeEvent<unknown>) => {
    setSelected(e.target.value as string)
    if (clients !== undefined) {
      setSelectedClient(clients.filter(i => i.name === e.target.value)[0])
    }
  }

  if (data) {
    return (
      <Card>
        <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
          <Grid container>
            <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                  <BusAiLogo/>
                  <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
                    {themeConfig.templateName}
                  </Typography>
                </Box>
                <div>
                  <Typography sx={{ mb: 2, color: 'text.secondary' }}>Office 149, 450 South Brand Brooklyn</Typography>
                  <Typography sx={{ mb: 2, color: 'text.secondary' }}>San Diego County, CA 91905, USA</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
                </div>
              </Box>
            </Grid>
            <Grid item xl={6} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h4' sx={{ mr: 2, width: '105px' }}>
                    Invoice
                  </Typography>
                  <CustomTextField
                    fullWidth
                    value={data.invoice.id}
                    sx={{ width: { sm: '250px', xs: '170px' } }}
                    InputProps={{
                      disabled: true,
                      startAdornment: <InputAdornment position='start'>#</InputAdornment>
                    }}
                  />
                </Box>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Date Issued:</Typography>
                  <DatePicker
                    id='issue-date'
                    selected={issueDate}
                    showDisabledMonthNavigation
                    customInput={<CustomInput />}
                    onChange={(date: Date) => setIssueDate(date)}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Date Due:</Typography>
                  <DatePicker
                    selected={dueDate}
                    showDisabledMonthNavigation
                    customInput={<CustomInput />}
                    onChange={(date: Date) => setDueDate(date)}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='h6' sx={{ mb: 6 }}>
                Invoice To:
              </Typography>
              <CustomTextField
                select
                sx={{
                  mb: 4,
                  width: '200px',
                  '& .MuiFilledInput-input.MuiSelect-select': {
                    minWidth: '11rem !important'
                  }
                }}
                SelectProps={{ value: selected, onChange: e => handleInvoiceChange(e) }}
              >
                {clients !== undefined ? (
                  clients.map(client => (
                    <MenuItem key={client.name} value={client.name}>
                      {client.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value=''>No clients</MenuItem>
                )}
              </CustomTextField>
              {selectedClient !== null ? (
                <>
                  <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>{selectedClient.company}</Typography>
                  <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>{selectedClient.address}</Typography>
                  <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>{selectedClient.contact}</Typography>
                  <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>{selectedClient.companyEmail}</Typography>
                </>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
              <div>
                <Typography variant='h6' sx={{ mb: 6 }}>
                  Bill To:
                </Typography>
                <TableContainer>
                  <Table>
                    <TableBody sx={{ '& .MuiTableCell-root': { py: `${theme.spacing(0.75)} !important` } }}>
                      <TableRow>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>Total Due:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                            {data.paymentDetails.totalDue}
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>Bank name:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>{data.paymentDetails.bankName}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>Country:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>{data.paymentDetails.country}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>IBAN:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>{data.paymentDetails.iban}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>SWIFT code:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography sx={{ color: 'text.secondary' }}>{data.paymentDetails.swiftCode}</Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <RepeaterWrapper>
          <Repeater count={count}>
            {(i: number) => {
              const Tag = i === 0 ? Box : Collapse

              return (
                <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                  <Grid container>
                    <RepeatingContent item xs={12}>
                      <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                        <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 2 } }}>
                          <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                            Item
                          </Typography>
                          <CustomTextField select fullWidth defaultValue='App Design'>
                            <MenuItem value='App Design'>App Design</MenuItem>
                            <MenuItem value='App Customization'>App Customization</MenuItem>
                            <MenuItem value='ABC Template'>ABC Template</MenuItem>
                            <MenuItem value='App Development'>App Development</MenuItem>
                          </CustomTextField>
                          <CustomTextField
                            rows={2}
                            fullWidth
                            multiline
                            sx={{ mt: 3.5 }}
                            defaultValue='Customization & Bug Fixes'
                          />
                        </Grid>
                        <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 2 } }}>
                          <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                            Cost
                          </Typography>
                          <CustomTextField
                            type='number'
                            placeholder='24'
                            defaultValue='24'
                            InputProps={{ inputProps: { min: 0 } }}
                          />
                          <Typography sx={{ mt: 3.5, mr: 2, color: 'text.secondary' }}>Discount:</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ mr: 2, color: 'text.secondary' }}>0%</Typography>
                            <Tooltip title='Tax 1' placement='top'>
                              <Typography sx={{ mr: 2, color: 'text.secondary' }}>0%</Typography>
                            </Tooltip>
                            <Tooltip title='Tax 2' placement='top'>
                              <Typography sx={{ color: 'text.secondary' }}>0%</Typography>
                            </Tooltip>
                          </Box>
                        </Grid>
                        <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 2 } }}>
                          <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                            Hours
                          </Typography>
                          <CustomTextField
                            type='number'
                            placeholder='1'
                            defaultValue='1'
                            InputProps={{ inputProps: { min: 0 } }}
                          />
                        </Grid>
                        <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                          <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                            Price
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>$24.00</Typography>
                        </Grid>
                      </Grid>
                      <InvoiceAction>
                        <IconButton size='small' onClick={deleteForm}>
                          <Icon icon='tabler:x' fontSize='1.25rem' />
                        </IconButton>
                      </InvoiceAction>
                    </RepeatingContent>
                  </Grid>
                </Tag>
              )
            }}
          </Repeater>

          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} sx={{ px: 0 }}>
              <Button variant='contained' onClick={() => setCount(count + 1)}>
                Add Item
              </Button>
            </Grid>
          </Grid>
        </RepeaterWrapper>

        <Divider />

        <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
          <Grid container>
            <Grid item xs={12} sm={7} lg={6} sx={{ order: { sm: 1, xs: 2 } }}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 500, lineHeight: 'normal' }}>
                  Salesperson:
                </Typography>
                <CustomTextField fullWidth defaultValue='Tommy Shelby' />
              </Box>
              <CustomTextField fullWidth defaultValue='Thanks for your business' />
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              lg={6}
              sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 }, display: 'flex', justifyContent: 'flex-end' }}
            >
              <Box sx={{ minWidth: 150, '& > *': { width: '100%' } }}>
                <CalcWrapper>
                  <Typography sx={{ color: 'text.secondary' }}>Subtotal:</Typography>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$1800</Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography sx={{ color: 'text.secondary' }}>Discount:</Typography>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$28</Typography>
                </CalcWrapper>
                <CalcWrapper sx={{ mb: '0 !important' }}>
                  <Typography sx={{ color: 'text.secondary' }}>Tax:</Typography>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>21%</Typography>
                </CalcWrapper>
                <Divider sx={{ my: `${theme.spacing(2)} !important` }} />
                <CalcWrapper>
                  <Typography sx={{ color: 'text.secondary' }}>Total:</Typography>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$1690</Typography>
                </CalcWrapper>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <CardContent sx={{ px: [6, 10] }}>
          <InputLabel
            htmlFor='invoice-note'
            sx={{ mb: 2, fontWeight: 500, fontSize: theme.typography.body2.fontSize, lineHeight: 'normal' }}
          >
            Note:
          </InputLabel>
          <CustomTextField
            rows={2}
            fullWidth
            multiline
            id='invoice-note'
            defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
          />
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

export default EditCard
