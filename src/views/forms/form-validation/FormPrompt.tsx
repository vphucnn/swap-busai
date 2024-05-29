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


interface FormInputs {
  prompt: string
}

const defaultValues = {
  prompt: '',
}

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>,
}


const FormPrompt = ({ setShow }: Props) => {
  // ** States


  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })


  const onSubmit = () => {
    console.log(control._formValues)
    setShow(true)
    toast.success('Form Submitted')
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={15}>
          <Grid item xs={12} >
            <Controller
              name='prompt'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
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
          <Grid item xs={12} >
            <Button type='submit' variant='contained'>
              Generate
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default FormPrompt
