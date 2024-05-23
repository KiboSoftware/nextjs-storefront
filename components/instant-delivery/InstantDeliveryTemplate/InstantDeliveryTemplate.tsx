import { useEffect, useState } from 'react'

import { Box, Stack, Step, Stepper, Typography, Slider, StepButton, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { type DeliveryDateAndWindow, DeliveryWindow } from '../DeliveryWindow/DeliveryWindow'
import { AddressForm } from '@/components/common'
import { DeliveryLocation, useGetStoreServiceBoundary } from '@/hooks'
import type { ContactForm } from '@/lib/types'

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
  setCurrentActiveStep: (step: number) => void
  children: any
}

const InstantDeliveryStepper = ({
  currentActiveStep,
  setCurrentActiveStep,
  children,
}: InstantDeliveryStepperProps) => {
  const { t } = useTranslation('common')
  const isSticky = false
  const steps = ['address', 'delivery-window']
  const activeChild = children?.[currentActiveStep] || null

  const getProgessValue = () => {
    return ((currentActiveStep + 1) / 2) * 100 - 25
  }

  const handleStepChange = (newActiveStep: number) => {
    if (newActiveStep === 1) return
    setCurrentActiveStep(newActiveStep)
  }

  return (
    <Stack sx={{ maxWidth: '872px' }} gap={1}>
      <Box sx={isSticky ? stepperStyles.wrapperBox : {}}>
        <Stepper nonLinear activeStep={currentActiveStep} connector={null} data-testid="stepper">
          {steps.map((label: string, index: number) => (
            <Step key={label} sx={{ flex: 1, padding: 0 }}>
              <StepButton icon={<></>} disabled={index === 1}>
                <Typography
                  variant="subtitle1"
                  color={index + 1 <= currentActiveStep ? 'primary' : 'inherit'}
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
  contact?: ContactForm
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

const mapToDeliveryLocation = (contact: ContactForm | undefined): DeliveryLocation | undefined => {
  if (!contact) return undefined

  return {
    street: contact?.address?.address1,
    city: contact?.address?.cityOrTown,
    country: contact?.address?.countryCode,
    state: contact?.address?.stateOrProvince,
    zipcode: contact?.address?.postalOrZipCode,
  }
}

const defaultInstantDelivery = {
  contact: undefined,
  storeBoundary: undefined,
  window: undefined,
  notification: { isSendSMS: false, isSendEmail: false },
}

const InstantDeliveryTemplate = ({
  initialInstantDelivery,
  onInstantDelivery,
  isAddressDisabled,
}: InstantDeliveryTemplateProps) => {
  const [instantDelivery, setInstantDelivery] = useState<InstantDelivery | undefined>(
    initialInstantDelivery || defaultInstantDelivery
  )
  // const storeBoundary = instantDelivery?.storeBoundary
  const window = instantDelivery?.window
  const { t } = useTranslation('common')

  const [currentActiveStep, setCurrentActiveStep] = useState(0)
  const [validateForm, setValidateForm] = useState<boolean>(false)

  const deliveryAddress = mapToDeliveryLocation(instantDelivery?.contact)
  const { data: storeBoundary } = useGetStoreServiceBoundary(deliveryAddress)

  const showErrorMessage = storeBoundary?.length === 0

  const handleSaveAddress = ({ contact }: { contact: ContactForm }) => {
    setInstantDelivery({ ...instantDelivery, contact })
    setValidateForm(false)
  }

  const handleValidateForm = () => {
    setInstantDelivery({ ...instantDelivery, contact: undefined })
    setValidateForm(true)
  }

  useEffect(() => {
    if (storeBoundary) setInstantDelivery({ ...instantDelivery, storeBoundary })
  }, [storeBoundary])

  useEffect(() => {
    if (instantDelivery?.window) {
      onInstantDelivery(instantDelivery)
    }
  }, [window])

  useEffect(() => {
    if (storeBoundary?.length || window) {
      if (currentActiveStep === 0) setCurrentActiveStep(1)
    } else {
      if (currentActiveStep === 1) setCurrentActiveStep(0)
    }
  }, [storeBoundary, window])

  useEffect(() => {
    if (initialInstantDelivery?.storeBoundary) setCurrentActiveStep(1)
  }, [initialInstantDelivery?.storeBoundary])

  return (
    <div>
      <InstantDeliveryStepper
        currentActiveStep={currentActiveStep}
        setCurrentActiveStep={setCurrentActiveStep}
      >
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {showErrorMessage && (
              <Typography variant="caption" component="h2">
                {t('delivery-address-error-message')}
              </Typography>
            )}
          </Box>
          <AddressForm
            contact={instantDelivery?.contact}
            isUserLoggedIn={false}
            setAutoFocus={true}
            validateForm={validateForm}
            onSaveAddress={handleSaveAddress}
            isDisabled={isAddressDisabled}
          />
          <Button
            variant="contained"
            color="inherit"
            style={{ textTransform: 'none' }}
            onClick={handleValidateForm}
          >
            {t('save-shipping-address')}
          </Button>
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
