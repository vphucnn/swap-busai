// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icon Imports

// ** Types
import { Box } from '@mui/system'
import { Dispatch, SetStateAction } from 'react'

import { Icon } from '@iconify/react'
import { Tooltip, Typography } from '@mui/material'
import NProgress from 'nprogress'
import React from 'react'
import { BusAiButton } from 'src/@core/components/button/BusAiButton'
import { BusAiChip } from 'src/@core/components/chip/BusAiChip'
import API from 'src/api'


interface FormInputs {
  prompt: string
}

const defaultValues = {
  prompt: '',
}

interface Props {
  setShow?: Dispatch<SetStateAction<boolean>>,
  setUrlImg: Dispatch<SetStateAction<string|null>>,
  setImageShare: Dispatch<SetStateAction<string|null>>
}


const FormPrompt = ({ setShow, setUrlImg, setImageShare }: Props) => {
  // ** States
  // ** Hooks
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })

  const onSubmit = async () => {
    NProgress.start()

    await fetchData(control._formValues.prompt)
    NProgress.done()
    if(setShow) setShow(true)
    toast.success('Form Submitted')
  }

  const fetchData = async (prompt: string) => {
    try {

      const response = await API.textToImage(prompt);
      console.log("response", response)
      setUrlImg(API.getUrlImage(response?.data?.data?.task_result?.resized_url))
      setImageShare(API.getUrlImage(response?.data?.data?.task_result?.url))

      return response.data
    } catch (error) {
      toast.error('Generate error')
    }
  };
  const handleClick = (value: string) => {
    setValue('prompt', value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Box>
        <Typography variant="body1" sx={{}}>
          Customizing Busai according to your ideas is simple, just write a detailed description in the box below. Share your achievements in Busai's community and receive surprising rewards
        </Typography>
      </Box>
      <Grid container gap={'1rem'}>
        <BusAiChip onClick={() => handleClick('Pink flip flops')} label='Pink flip flops' />
        <BusAiChip onClick={() => handleClick('Standing on 1 leg')} label='Standing on 1 leg' />
        <BusAiChip onClick={() => handleClick('stick out the tongue')} label='stick out the tongue' />
        <BusAiChip onClick={() => handleClick('Red hat with a horn on it')} label='Red hat with a horn on it' />
        <BusAiChip onClick={() => handleClick('Jean Jacket with rocker style')} label='Jean Jacket with rocker style' />
        <BusAiChip onClick={() => handleClick('Funny nerdy face')} label='Funny nerdy face' />
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={10}>
          <Grid item xs={12} >
            <Controller
              name='prompt'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  rows={7}
                  multiline
                  value={value}
                  onChange={onChange}
                  placeholder='Prompt'
                  error={Boolean(errors.prompt)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.prompt && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} container justifyContent="flex-start" >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <BusAiButton backgroundColor={'#FF66C8'} borderBottom={'4px #CC0083 solid'} type='submit' variant='contained'>
                Generate
              </BusAiButton>
              <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Typography variant="body1">
                  Generated 1/3
                </Typography>
                <Tooltip placement='top' title={
                  <React.Fragment>
                    <Typography color="inherit">Generated</Typography>
                  </React.Fragment>
                }>
                  <Icon icon='tabler:info-circle' fontSize={20} />
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default FormPrompt
