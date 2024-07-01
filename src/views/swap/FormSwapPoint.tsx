// ** MUI Imports
import { InputBase, Typography, useMediaQuery } from '@mui/material'
import Card from '@mui/material/Card'
import { Box, Theme } from '@mui/system'
import { useState } from 'react';
import { BusAiButton } from 'src/@core/components/button/BusAiButton';

const FormSwapPoint = () => {

  const [value, setValue] = useState();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  // const [maxValue, setMaxValue] = useState();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: { target: { value: any; }; }) => {
    const inputValue = event.target.value;
    console.log(inputValue)

    // Validate the input value here
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100) {
      setError(null)
      setValue(inputValue);
    } else {
      console.log(value)
      setError("The number must be greater than 0 and less than 100")
    }
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#FFFFFF', border: '2px solid #000000', padding: '2rem', borderRadius: { lg: '24px', xs: '12px' }, }}>
      <Box>
        <Typography sx={{
          fontFamily: 'Bricolage Grotesque',
          fontSize: 22,
          fontWeight: 600,
          lineHeight: '26.4px',
          letterSpacing: -0.5,
          textAlign: 'left',
          color: '#000000',
        }}>
          100 points = 1 BUSAI
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexDirection: 'column' }}>
        <Typography sx={{
          fontFamily: 'Bricolage Grotesque',
          fontSize: 18,
          fontWeight: 700,
          lineHeight: '25.6px',
          letterSpacing: -0.30000001192092896,  // Assuming this value is intended
          textAlign: 'left',
          color: '#CBFB45'
        }}>
          Points swap
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <InputBase fullWidth id="fullWidth" sx={{
            background: '#726FF733',
            borderRadius: '16px',
            border: 'none',
            padding: '0.5rem'
          }}
            placeholder='Enter number'
            type="number"
            inputProps={{ min: 0, max: 100 }}
            onChange={handleChange}

          />
          {error && <Typography variant="body1" sx={{ color: 'red', fontSize: { lg: '16px', xs: '12px' }, textAlign: 'left', }} >{error}</Typography>}
        </Box>

      </Box>
      <Box>
        <BusAiButton size={isMobile ? 'small' : 'medium'} sx={{ width: "100%", gap: '0.5rem', fontSize: isMobile ? '14px' : '18px', '&:hover': { borderBottom: '4px #CC0083  solid' } }} disabled={!!error} backgroundColor={'#CBFB45'} borderBottom={'4px #6F9603 solid'} onClick={() => {
          console.log(value)
        }} >
          Share
        </BusAiButton>
      </Box>
    </Card >
  )
}

export default FormSwapPoint


