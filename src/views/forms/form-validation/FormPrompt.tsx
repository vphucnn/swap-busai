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
import { Button, Tooltip, Typography } from '@mui/material'

// import NProgress from 'nprogress'
import React from 'react'
import { BusAiButton } from 'src/@core/components/button/BusAiButton'
import { BusAiChip } from 'src/@core/components/chip/BusAiChip'
import { getRandomHints, getRandomOneHints } from 'src/@core/utils/helps'
import API from 'src/api'
import { useAuth } from 'src/hooks/useAuth'
import { listPrompt } from 'src/configs/const'


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
  setImageId?: Dispatch<SetStateAction<string | null>>
}




const FormPrompt = ({ setIsLoading, isLoading, setShow }: Props) => {
  // ** States
  // ** Hooks

  const [listChip, setListChip] = useState<string[]>([])
  const { user } = useAuth()
  const [lengthPrompt, setLengthPrompt] = useState<number>()

  const reloadChip = () => {
    setListChip(getRandomHints(listPrompt))
  }

  useEffect(() => {
    reloadChip()
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm<FormInputs>({ defaultValues })

  const onSubmit = async () => {
    if (!user) {
      return toast.error("You need to log in")
    }

    // NProgress.start()
    setIsLoading(true)
    await fetchData(control._formValues.prompt)

    // setIsLoading(false)

    // NProgress.done()
    if (setShow) setShow(true)
  }

  const fetchData = async (prompt: string) => {
    try {

      const response = await API.textToImage(prompt);

      // setUrlImg(API.getUrlImageMiniSizeById(response?.data?.data?.task_result?.id))

      // setImageId(response?.data?.data?.task_result?.id)
      // toast.success('Generate done')
      // updateProfile()

      return response.data
    } catch (error: any) {
      // console.log(error)
      // toast.error(error?.response.data.message)
    }
  };
  const handleClick = (value: string, index: number) => {
    const currentPrompt = control._formValues?.prompt || ''; // Handle potential undefined value
    const updatedPrompt = currentPrompt ? `${currentPrompt}, ${value}` : value;
    setValue('prompt', updatedPrompt);
    setLengthPrompt(updatedPrompt.length);
    let chip = getRandomOneHints(listPrompt)
    while (chip === value) {
      chip = getRandomOneHints(listPrompt)      // Khối mã cần lặp lại
    }
    const newListChip = [...listChip]
    newListChip[index] = chip
    setListChip(newListChip)
  };

  const validateLength = (value: any) => {
    if (value && value.length > 500) { // Change 10 to your desired limit
      return toast.error('Input exceeds the maximum 500 character limit.');
    }

    return undefined; // No error
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Box>
        <Typography variant="body1" sx={{}}>
          Customizing Busai according to your ideas is simple, just write a detailed description in the box below. Share your achievements in Busai's community and receive surprising rewards
        </Typography>
      </Box>
      {listChip && <Grid container gap={'1rem'} sx={{ marginTop: '1rem' }}>
        {
          listChip.map((item, index) => (<BusAiChip key={index} onClick={() => handleClick(item, index)} label={item} />))
        }
      </Grid>}
      <Grid item xs={12} container justifyContent="flex-end" >
        <Button disableRipple disableTouchRipple sx={{
          '&:hover': {
            backgroundColor: 'transparent', // Maintain same background color
          },
        }} variant='text' onClick={reloadChip} aria-label="reload">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.05137 11.866C7.48774 11.1809 6.71967 10.6693 5.84528 10.3966L3.59174 9.70725C3.4186 9.64931 3.26877 9.5424 3.16282 9.40121C3.05688 9.26002 3 9.09147 3 8.91868C3 8.74588 3.05688 8.57733 3.16282 8.43614C3.26877 8.29495 3.4186 8.18805 3.59174 8.1301L5.84528 7.44077C6.51292 7.2243 7.1193 6.86763 7.61839 6.39786C8.11748 5.92808 8.49615 5.35756 8.72563 4.7296L8.74199 4.67729L9.47681 2.55852C9.5381 2.3952 9.65176 2.25378 9.80213 2.15375C9.9525 2.05372 10.1322 2 10.3164 2C10.5006 2 10.6802 2.05372 10.8306 2.15375C10.981 2.25378 11.0946 2.3952 11.1559 2.55852L11.8891 4.67729C12.1173 5.3213 12.502 5.90641 13.0128 6.38613C13.5236 6.86585 14.1464 7.22696 14.8316 7.44077L17.0868 8.1301L17.131 8.14087C17.3041 8.19882 17.454 8.30572 17.5599 8.44691C17.6659 8.5881 17.7227 8.75666 17.7227 8.92945C17.7227 9.10224 17.6659 9.2708 17.5599 9.41199C17.454 9.55318 17.3041 9.66008 17.131 9.71802L14.8758 10.4074C14.1907 10.6214 13.5681 10.9826 13.0573 11.4622C12.5465 11.9419 12.1617 12.5269 11.9333 13.1708L11.2017 15.2896C11.1393 15.4528 11.0251 15.5941 10.8744 15.6943C10.7621 15.769 10.6328 15.8182 10.4968 15.838C10.3608 15.8578 10.2218 15.8477 10.0906 15.8085C9.95949 15.7693 9.8398 15.702 9.74096 15.612C9.64212 15.522 9.56683 15.4116 9.52099 15.2896L8.78782 13.1708C8.62304 12.6997 8.37399 12.2584 8.05137 11.866ZM20.6431 17.7146L19.3911 17.333C19.0104 17.2141 18.6644 17.0134 18.3806 16.7468C18.0968 16.4803 17.883 16.1552 17.7562 15.7974L17.3487 14.6203C17.3148 14.5294 17.2517 14.4506 17.1681 14.3949C17.0846 14.3392 16.9847 14.3093 16.8822 14.3093C16.7798 14.3093 16.6799 14.3392 16.5963 14.3949C16.5128 14.4506 16.4497 14.5294 16.4158 14.6203L16.0083 15.7958C15.8843 16.1513 15.6746 16.475 15.3956 16.7417C15.1165 17.0083 14.7756 17.2107 14.3996 17.333L13.146 17.7146C13.0493 17.7464 12.9656 17.8057 12.9063 17.8843C12.847 17.9629 12.8152 18.0568 12.8152 18.1531C12.8152 18.2494 12.847 18.3433 12.9063 18.4219C12.9656 18.5005 13.0493 18.5598 13.146 18.5916L14.3996 18.9748C14.7811 19.0942 15.1275 19.2957 15.4114 19.5634C15.6953 19.8311 15.9087 20.1575 16.0345 20.5165L16.4404 21.6921C16.475 21.7823 16.5384 21.8602 16.6218 21.9153C16.7053 21.9704 16.8048 22 16.9068 22C17.0088 22 17.1083 21.9704 17.1918 21.9153C17.2752 21.8602 17.3386 21.7823 17.3732 21.6921L17.7824 20.5165C17.9086 20.1585 18.122 19.8331 18.4055 19.5662C18.6891 19.2994 19.0349 19.0984 19.4156 18.9794L20.6692 18.5978C20.7659 18.5659 20.8497 18.5066 20.9089 18.4281C20.9682 18.3495 21 18.2556 21 18.1593C21 18.0629 20.9682 17.969 20.9089 17.8905C20.8497 17.8119 20.7659 17.7526 20.6692 17.7207L20.6431 17.7146Z" fill="#726FF7" />
          </svg>
          <Typography variant="body1" sx={{ fontWeight: 700, color: '#726FF7' }}>
            Hints
          </Typography>
        </Button>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={10}>
          <Grid item xs={12} >
            <Controller
              name='prompt'
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <CustomTextField
                  fullWidth
                  rows={7}
                  multiline
                  value={value}
                  {...register('prompt', {
                    validate: validateLength,
                    onChange: (e) => {
                      setLengthPrompt(e.target.value.length)
                    },
                  })}
                  placeholder='Enter your prompt here'
                  error={Boolean(errors.prompt)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.prompt && { helperText: "" })}
                />
              )}
            />
            <Typography variant="body1" sx={{float: 'right', marginTop: '0.3rem', color: lengthPrompt && lengthPrompt > 500 ? 'red': '' }}>
              {`${lengthPrompt?lengthPrompt :  0}/500`}
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-start" >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <BusAiButton disabled={isLoading || !user || !lengthPrompt || lengthPrompt > 500} backgroundColor={'#FF66C8'} borderBottom={'4px #CC0083 solid'} type='submit' variant='contained'>
                Generate
              </BusAiButton>
              <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Typography variant="body1">
                  Generated {user?.checkProfile?.taskOfDay || 0}/{user?.checkProfile?.config?.maxTaskPerDay || 3}
                </Typography>
                <Tooltip placement='top' title={
                  <React.Fragment>
                    <Typography color="inherit">Each user can only generate and share photos up to 3 times a day to earn points</Typography>
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
