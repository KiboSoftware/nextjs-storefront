import React, { ReactNode, Children } from 'react'

import { Box, Stack, Step, Stepper, Typography, Slider, StepButton } from '@mui/material'

interface StepperProps {
  steps: string[]
  children: ReactNode
  activeStep: number
}

const KiboStepper = (props: StepperProps) => {
  const { steps, children, activeStep } = props

  const totalSteps = () => {
    return steps.length
  }

  const getProgessValue = () => {
    return ((activeStep + 1) / totalSteps()) * 100 - 12.5
  }

  return (
    <Stack sx={{ maxWidth: '872px' }} gap={3}>
      <Box>
        <Stepper nonLinear activeStep={activeStep} connector={null} data-testid="kibo-stepper">
          {steps.map((label, index) => (
            <Step key={label} sx={{ flex: 1, padding: 0 }}>
              <StepButton icon={<></>}>
                <Typography
                  variant="subtitle1"
                  color={index + 1 <= activeStep ? 'primary' : 'inherit'}
                  sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                >
                  {label}
                </Typography>
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box pt={1}>
          <Slider aria-label="checkout-steps" value={getProgessValue()} size="small" />
        </Box>
      </Box>

      {Children.toArray(children)[activeStep]}
    </Stack>
  )
}

export default KiboStepper
