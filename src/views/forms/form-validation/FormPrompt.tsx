// ** React Imports

// ** MUI Imports
import Button from '@mui/material/Button'
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
import axios from 'axios'

import NProgress from 'nprogress'
import { Tooltip, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import React from 'react'


interface FormInputs {
  prompt: string
}

const defaultValues = {
  prompt: '',
}

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>,
  setUrlImg: Dispatch<SetStateAction<string>>,
}


const FormPrompt = ({ setShow, setUrlImg }: Props) => {
  // ** States
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })

  const onSubmit = async () => {
    NProgress.start()

    await fetchData(control._formValues.prompt)
    NProgress.done()
    setShow(true)
    toast.success('Form Submitted')
  }

  const fetchData = async (prompt: string) => {
    try {
      const data = JSON.stringify({
        "host": "Fireworks",
        "model_name": "stable-diffusion-xl-1024-v1-0",
        "prompt": prompt,
        "negative_prompt": "bad proportions, asymmetric ears, broken wrist, additional limbs, asymmetric, collapsed eyeshadow, altered appendages, broken finger, bad anatomy, elongated throat, double face, conjoined, bad face, broken hand, out of frame, disconnected limb, 3d, bad ears, amputee, cross-eyed, disfigured, cartoon, bad eyes, cloned face, combined appendages, broken leg, copied visage, absent limbs, childish, cropped head, cloned head, desiccated, duplicated features, dismembered, disproportionate, cripple.",
        "config": {
          "image_content_type": "image/png",
          "size": "1024 x 1024",
          "cfg_scale": 7,
          "seed": 5564,
          "steps": 30,
          "sampler": "K_DPMPP_2M",
          "safety_check": true
        }
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ai-api-gpu-local.playgroundx.site/v2/ai_center/text-to-image',
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjQ4NTgyODUyNDEsInVzZXJfaWQiOiIxIn0.WcBCWXVZqI5G4sRRi_eOSxfEP5ynQfCbGsKQNOulkfU',
          'Content-Type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(config);
      setUrlImg(response?.data?.data?.file_url?.url)

      return response.data
    } catch (error) {
      toast.error('Generate error')
    }
  };

  return (
    <Box>
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
                  rows={6}
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
          <Grid item xs={12} container justifyContent="flex-end" >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              <Button type='submit' variant='contained'>
                Generate
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default FormPrompt
