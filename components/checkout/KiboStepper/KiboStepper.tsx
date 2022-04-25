import React, { ReactNode, Children } from 'react'

import { Box, Stack, Step, Stepper, Typography, Slider, StepButton } from '@mui/material'

import StepperContext, {
  UserEnteredDetails,
  UserEnteredShipping,
  UserEnteredPayment,
} from '@/components/checkout/Context/Context'

interface StepperProps {
  steps: string[]
  children: ReactNode
  activeStep: number

  setUserEnteredDetails: (userEnteredDetails: UserEnteredDetails) => void
  setUserEnteredShipping: (userEnteredShipping: UserEnteredShipping) => void
  setUserEnteredPayment: (userEnteredPayment: UserEnteredPayment) => void
}

const KiboStepper = (props: StepperProps) => {
  const {
    steps,
    children,
    activeStep,
    setUserEnteredDetails,
    setUserEnteredShipping,
    setUserEnteredPayment,
  } = props

  const contextValue = { setUserEnteredDetails, setUserEnteredShipping, setUserEnteredPayment }

  const totalSteps = () => {
    return steps.length
  }

  const getProgessValue = () => {
    return ((activeStep + 1) / totalSteps()) * 100 - 12.5
  }

  return (
    <Stack sx={{ width: '100%', maxWidth: '872px' }} gap={3}>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep} connector={null}>
          {steps.map((label, index) => (
            <Step key={label} sx={{ flex: 1 }}>
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

      <StepperContext.Provider value={contextValue}>
        {Children.toArray(children)[activeStep]}
      </StepperContext.Provider>
      <Box></Box>
    </Stack>
  )
}

export default KiboStepper
