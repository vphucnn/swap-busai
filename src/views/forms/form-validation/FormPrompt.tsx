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
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Icon } from '@iconify/react'
import { Tooltip, Typography } from '@mui/material'
import NProgress from 'nprogress'
import React from 'react'
import { BusAiButton } from 'src/@core/components/button/BusAiButton'
import { BusAiChip } from 'src/@core/components/chip/BusAiChip'
import API from 'src/api'
import { getRandomEight } from 'src/@core/utils/helps'
import IconButton from '@mui/material/IconButton';


interface FormInputs {
  prompt: string
}

const defaultValues = {
  prompt: '',
}

interface Props {
  isLoading: boolean,
  setShow?: Dispatch<SetStateAction<boolean>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setUrlImg: Dispatch<SetStateAction<string | null>>,
  setImageShare: Dispatch<SetStateAction<string | null>>
}


const chip = [
  "Pink flip flops",
  "Standing on 1 leg",
  "Stick out the tongue",
  "Red hat with a horn on it",
  "Jean Jacket with rocker style",
  "Funny nerdy face",
  "Shareable",
  "Engaging",
  "Reflecting culture",
  "Relatable and understandable",
  "Pop culture phenomenon",
  "Humorous and witty",
  "Visually appealing",
  "Thought-provoking"
]


const FormPrompt = ({ setIsLoading ,isLoading, setShow, setUrlImg, setImageShare }: Props) => {
  // ** States
  // ** Hooks
  // const [isLoading, setIsLoading] = useState(false);

  const [listChip, setListChip] = useState<string[]>([])


  const reloadChip = () => {
    setListChip(getRandomEight(chip))
  }

  useEffect(() => {
    reloadChip()
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })

  const onSubmit = async () => {
    NProgress.start()
    setIsLoading(true)
    await fetchData(control._formValues.prompt)
    setIsLoading(false)
    NProgress.done()
    if (setShow) setShow(true)
  }

  const fetchData = async (prompt: string) => {
    try {

      const response = await API.textToImage(prompt);
      setUrlImg(API.getUrlImage(response?.data?.data?.task_result?.resized_url))
      setImageShare(API.getUrlImage(response?.data?.data?.task_result?.url))
      toast.success('Generate done')

      return response.data
    } catch (error) {
      toast.error('Generate error')
    }
  };
  const handleClick = (value: string) => {
    const currentPrompt = control._formValues?.prompt || ''; // Handle potential undefined value
    const updatedPrompt = currentPrompt ? `${currentPrompt}, ${value}` : value;
    setValue('prompt', updatedPrompt);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Box>
        <Typography variant="body1" sx={{}}>
          Customizing Busai according to your ideas is simple, just write a detailed description in the box below. Share your achievements in Busai's community and receive surprising rewards
        </Typography>
      </Box>
      <Grid container gap={'1rem'}>
        {
          listChip.map((item, index) => (<BusAiChip key={index} onClick={() => handleClick(item)} label={item} />))
        }
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end" >
        <IconButton onClick={reloadChip} aria-label="reload">
          <Icon color={'#ff66c8'} icon='tabler:reload' fontSize={20} />
        </IconButton>
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
              <BusAiButton disabled={isLoading} backgroundColor={'#FF66C8'} borderBottom={'4px #CC0083 solid'} type='submit' variant='contained'>
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
