import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const StepIndicator = ({ currentStep, totalSteps }: any) => {
  const steps = [];

  for (let i = 1; i <= totalSteps; i++) {
    const isActive = i <= currentStep;
    const isDone = i < currentStep;

    const backgroundColor = isActive ? '#FF66C8' : '#B1B1B1';
    const borderColor = isDone ? '#FF66C8' : '#B1B1B1';

    steps.push(
      <Box sx={{ display: 'flex' }}>
        <Box key={i} style={{ width: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
          <Box
            style={{
              width: 32,
              height: 32,
              padding: 10,
              backgroundColor,
              borderRadius: 50,
              border: `1px solid ${borderColor}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <IconButton  sx={{ width: '33px', height: '32px' }}>
              <Box style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins', fontWeight: 400, lineHeight: "20px", letterSpacing: 0.02, wordWrap: 'break-word' }}>
                {!isDone ? i :
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.33398 5.00002L5.10732 8.77335L12.6673 1.22668" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              </Box>
            </IconButton>
          </Box>
          <Box style={{ color: backgroundColor, fontSize: 16, fontFamily: 'Bricolage Grotesque', fontWeight: 400, lineHeight: "32px", wordWrap: 'break-word' }}>
            Step {i}
          </Box>

        </Box>
        {i < totalSteps && ( // Only render the dotted line for steps before the last one
          <Box sx={{ height: '30px', display: 'fex', justifyContent: 'flex', alignItems: 'center' }}>
            <Box style={{ width: "92px", height: 0, opacity: 1, border: `1px ${borderColor} dashed` }} />
          </Box>
        )}
      </Box>

    );
  }

  return (
    <Box style={{ display: 'flex' }}>
      {steps}
    </Box>
  );
};

export default StepIndicator;
