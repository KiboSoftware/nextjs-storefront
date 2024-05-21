import { useEffect, useState } from 'react'

import { Box, Stack, Step, Stepper, Typography, Slider, StepButton, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { type DeliveryDateAndWindow, DeliveryWindow } from '../DeliveryWindow/DeliveryWindow'
import DeliveryAddress from '@/components/instant-delivery/DeliveryAddress/DeliveryAddress'
import { DeliveryLocation } from '@/hooks'

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

type InstantDeliveryStepperProps = {
  currentActiveStep: number
  children: any
}

const InstantDeliveryStepper = ({ currentActiveStep, children }: InstantDeliveryStepperProps) => {
  const { t } = useTranslation('common')

  const isSticky = false
  const [activeStep, setActiveStep] = useState(currentActiveStep)
  const steps = ['address', 'delivery-window']

  const activeChild = children?.[activeStep] || null

  const getProgessValue = () => {
    return ((activeStep + 1) / 2) * 100 - 25
  }

  const handleStepChange = (newActiveStep: number) => {
    if (newActiveStep === 1) return
    setActiveStep(newActiveStep)
  }

  useEffect(() => {
    setActiveStep(currentActiveStep)
  }, [currentActiveStep])

  return (
    <Stack sx={{ maxWidth: '872px' }} gap={1}>
      <Box sx={isSticky ? stepperStyles.wrapperBox : {}}>
        <Stepper nonLinear activeStep={activeStep} connector={null} data-testid="stepper">
          {steps.map((label: string, index: number) => (
            <Step key={label} sx={{ flex: 1, padding: 0 }}>
              <StepButton icon={<></>} disabled={index === 1}>
                <Typography
                  variant="subtitle1"
                  color={index + 1 <= activeStep ? 'primary' : 'inherit'}
                  sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                  onClick={() => handleStepChange(index)}
                >
                  {t(label)}
                </Typography>
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box pt={1}>
          <Slider aria-label="checkout-steps" value={getProgessValue()} size="small" />
        </Box>
      </Box>
      <Box> {activeChild}</Box>
    </Stack>
  )
}

type Window = {
  pickupTime: { startsAt: number; endsAt?: number }
  dropoffTime: { startsAt: number; endsAt: number }
  readable: string
}
type InstantDelivery = {
  address?:
    | {
        firstName: string
        lastName: string
        phoneNumber: string
        street: string
        city: string
        country: string
        state: string
        zipcode: string
      }
    | undefined
  storeBoundary?: string[] | undefined | null
  window?:
    | {
        confirmedDate: string
        confirmedWindow: Window
        confirmedStoreId: string
      }
    | undefined
  notification?: { isSendSMS: boolean; isSendEmail: boolean }
}

type InstantDeliveryTemplateProps = {
  initialInstantDelivery?: InstantDelivery
  onInstantDelivery: (selectedAddress: any) => void
  isAddressDisabled?: boolean
}

const InstantDeliveryTemplate = ({
  initialInstantDelivery,
  onInstantDelivery,
  isAddressDisabled,
}: InstantDeliveryTemplateProps) => {
  const [instantDelivery, setInstantDelivery] = useState<InstantDelivery | undefined>(
    initialInstantDelivery
  )
  const storeBoundary = instantDelivery?.storeBoundary
  const window = instantDelivery?.window

  const [currentActiveStep, setCurrentActiveStep] = useState(0)

  useEffect(() => {
    if (instantDelivery?.window) {
      onInstantDelivery(instantDelivery)
    }
  }, [window])

  useEffect(() => {
    if (storeBoundary || window) {
      if (currentActiveStep === 0) setCurrentActiveStep(1)
    } else {
      if (currentActiveStep === 1) setCurrentActiveStep(0)
    }
  }, [storeBoundary, window])

  return (
    <div>
      <InstantDeliveryStepper currentActiveStep={currentActiveStep}>
        <div>
          <DeliveryAddress
            instantDelivery={instantDelivery}
            setInstantDelivery={setInstantDelivery}
            isAddressDisabled={isAddressDisabled}
          />
        </div>
        <div>
          <DeliveryWindow
            instantDelivery={instantDelivery}
            setInstantDelivery={setInstantDelivery}
          />
        </div>
      </InstantDeliveryStepper>
    </div>
  )
}

export default InstantDeliveryTemplate
