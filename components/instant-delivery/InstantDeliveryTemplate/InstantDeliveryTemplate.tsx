import { useEffect, useState } from 'react'

import { Box, Stack, Step, Stepper, Typography, Slider, StepButton } from '@mui/material'
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
  storeBoundary?: string[] | null
  children: any
}

type InstantDeliveryTemplateProps = {
  initialDeliveryAddress?: DeliveryLocation
}

const InstantDeliveryStepper = ({ storeBoundary, children }: InstantDeliveryStepperProps) => {
  const { t } = useTranslation('common')
  const isAddressValid = !!storeBoundary

  const isSticky = false
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['address', 'delivery-window']

  const activeChild = children?.[activeStep] || null

  const getProgessValue = () => {
    return ((activeStep + 1) / 2) * 100 - 25
  }

  const handleStepChange = (index: number) => {
    if (index === 1 && !isAddressValid) return
    setActiveStep(index)
  }

  useEffect(() => {
    if (storeBoundary) {
      setActiveStep(1)
    }
  }, [storeBoundary])

  return (
    <Stack sx={{ maxWidth: '872px' }} gap={1}>
      <Box sx={isSticky ? stepperStyles.wrapperBox : {}}>
        <Stepper nonLinear activeStep={activeStep} connector={null} data-testid="stepper">
          {steps.map((label: string, index: number) => (
            <Step key={label} sx={{ flex: 1, padding: 0 }}>
              <StepButton icon={<></>} disabled={index === 1 && !isAddressValid}>
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

const InstantDeliveryTemplate = ({ initialDeliveryAddress }: InstantDeliveryTemplateProps) => {
  const [storeBoundary, setStoreBoundary] = useState<string[] | undefined | null>(undefined)
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryLocation | undefined>(
    initialDeliveryAddress
  )
  const [deliveryDateAndWindow, setDeliveryDateAndWindow] = useState<DeliveryDateAndWindow>()

  useEffect(() => {
    if (deliveryDateAndWindow) {
      console.log(`-------`)
      console.log(`confirmed Address: ${JSON.stringify(deliveryAddress)}`)
      console.log(`confirmed Date: ${JSON.stringify(deliveryDateAndWindow)}`)
    }
  }, [deliveryDateAndWindow])

  return (
    <div>
      <InstantDeliveryStepper storeBoundary={storeBoundary}>
        <div>
          <DeliveryAddress
            storeBoundary={storeBoundary}
            setStoreBoundary={setStoreBoundary}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
          />
        </div>
        <div>
          <DeliveryWindow
            storeBoundary={storeBoundary}
            setDeliveryDateAndWindow={setDeliveryDateAndWindow}
          />
        </div>
      </InstantDeliveryStepper>
    </div>
  )
}

export default InstantDeliveryTemplate
