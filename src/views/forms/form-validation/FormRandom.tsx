// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Import

// ** Third Party Imports
// import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icon Imports

// ** Types
import { Box } from '@mui/system'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Button, Tooltip, Typography } from '@mui/material'

// import NProgress from 'nprogress'
import React from 'react'
import { BusAiButton } from 'src/@core/components/button/BusAiButton'
import { BusAiChip } from 'src/@core/components/chip/BusAiChip'
import StepBar from 'src/@core/components/steper/StepBar'
import { Icon } from '@iconify/react'
import API from 'src/api'
import { useAuth } from 'src/hooks/useAuth'
import { listPrompt } from 'src/configs/const'


// interface FormInputs {
//   prompt: string
// }

// const defaultValues = {
//   prompt: '',
// }

interface Props {
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setShow?: Dispatch<SetStateAction<boolean>>,
  setUrlImg: Dispatch<SetStateAction<string | null>>,
  setImageId?: Dispatch<SetStateAction<string | null>>
}




const FormRandom = ({ setIsLoading, isLoading, setShow }: Props) => {

  const [listChip, setListChip] = useState<any[]>([])
  const [showRemove, setShowRemove] = useState<boolean>(true)
  const { user } = useAuth()

  useEffect(() => {
    randomChip()
  }, []);

  const genPrompt = () => {
    let resultString = "";
    for (const obj of listChip) {
      resultString += `${obj.chips[0]},`;
    }

    return resultString
  }

  const removeChip = (index: number) => {
    const newListCip = [...listChip];
    newListCip[index].chips = []
    console.log(newListCip)
    setListChip(newListCip)
  }

  const randomChip = () => {
    const newListCip = JSON.parse(JSON.stringify(listPrompt));
    for (let i = 0; i < newListCip.length; i++) {
      const randomIndex = Math.floor(Math.random() * newListCip[i].chips.length);
      newListCip[i].chips = [newListCip[i].chips[randomIndex]]
      console.log(listPrompt)
    }
    setListChip(newListCip)
  }

  const onSubmit = async () => {
    if (!user) {
      return toast.error("You need to log in")
    }

    // NProgress.start()
    setIsLoading(true)
    await fetchData(genPrompt())

    // NProgress.done()
    // setIsLoading(false)
    if (setShow) setShow(true)
  }
  const [currentStep, setCurrentStep] = useState<number>(1)
  useEffect(() => {
    setShowRemove(currentStep < 2)
  }, [currentStep]);


  const fetchData = async (prompt: string) => {
    try {

      const response = await API.textToImage(prompt);

      // setUrlImg(API.getUrlImageMiniSizeById(response?.data?.data?.task_result?.id))
      // console.log(response?.data?.data)

      // setImageId(response?.data?.data?.task_result?.id)
      // toast.success('Generate done')

      return response.data
    } catch (error: any) {
      // toast.error(error?.response.data.message)
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Box>
        <Typography variant="body1" sx={{}}>
          Creating Busai memes is easy and full of surprise with ideas you’ve never thought of with the random generate meme feature.
        </Typography>
      </Box>
      <Box>
        <StepBar currentStep={currentStep} totalSteps={2} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {listChip.map((item, index) => (

          <Box key={index} sx={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
            <Box>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  width: '80px',
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: '25.6px',
                  wordWrap: 'break-word',
                }}
              >
                {item.type}
              </Typography>
            </Box>
            <Box>
              <Grid container gap={'1rem'}>
                {item.chips[0] && <BusAiChip label={item.chips[0]} showRemove={showRemove} remove={() => removeChip(index)} />}
              </Grid>
            </Box>
          </Box>
        ))}

      </Box>
      <form>
        <Grid container gap={10}>
          <Grid item xs={12} container justifyContent="flex-start" >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
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
          <Grid item xs={12} container justifyContent="flex-start" >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              {currentStep === 1 && <Button variant='outlined' sx={{ borderRadius: 40 }} onClick={randomChip}>
                Random
              </Button>}
              {currentStep === 2 && <Button onClick={() => setCurrentStep(1)} variant='outlined' sx={{ borderRadius: 40 }}>
                Previous
              </Button>}
              {currentStep === 1 && <BusAiButton onClick={() => setCurrentStep(2)} backgroundColor={'#FF66C8'} borderBottom={'4px #CC0083 solid'} variant='contained'>
                Next
              </BusAiButton>}
              {currentStep === 2 && <BusAiButton disabled={isLoading || !user} backgroundColor={'#FF66C8'} borderBottom={'4px #CC0083 solid'} onClick={onSubmit} variant='contained'>
                Generate
              </BusAiButton>}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default FormRandom
