import React, { ReactNode, Children, useEffect } from 'react'

import { Box, Stack, Step, Stepper, Typography, Slider, StepButton } from '@mui/material'
import { useRouter } from 'next/router'

import { useCheckoutStepContext } from '@/context'

interface StepperProps {
  children: ReactNode
  isSticky: boolean
}

const stepperStyles = {
  wrapperBox: {
    position: 'sticky',
    width: '100%',
    zIndex: 999,
    backgroundColor: 'common.white',
    top: '50px',
    paddingTop: '20px',
  },
}

const KiboStepper = (props: StepperProps) => {
  const { children, isSticky = true } = props

  const { activeStep, steps, setActiveStep } = useCheckoutStepContext()
  const router = useRouter()

  const totalSteps = () => {
    return steps.length
  }

  const getProgessValue = () => {
    return ((activeStep + 1) / totalSteps()) * 100 - 12.5
  }

  const handleBack = (index: number) => {
    if (activeStep > index) setActiveStep(index)
  }

  useEffect(() => {
    const urlStep = router?.query?.step as string
    if (!urlStep) return

    const capitalizeUrlStep = urlStep.charAt(0).toUpperCase() + urlStep.slice(1)
    if (steps.includes(capitalizeUrlStep)) setActiveStep(steps.indexOf(capitalizeUrlStep))
  }, [])

  return (
    <Stack sx={{ maxWidth: '872px' }} gap={3}>
      <Box sx={isSticky ? stepperStyles.wrapperBox : {}}>
        <Stepper nonLinear activeStep={activeStep} connector={null} data-testid="kibo-stepper">
          {steps.map((label: string, index: number) => (
            <Step key={label} sx={{ flex: 1, padding: 0 }}>
              <StepButton icon={<></>}>
                <Typography
                  variant="subtitle1"
                  color={index + 1 <= activeStep ? 'primary' : 'inherit'}
                  sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                  onClick={() => handleBack(index)}
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
