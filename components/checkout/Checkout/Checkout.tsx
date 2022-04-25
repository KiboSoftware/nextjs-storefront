import React, { useState, useRef, ElementRef, useEffect } from 'react'

import { Box, Stack, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import {
  UserEnteredDetails,
  UserEnteredShipping,
  UserEnteredPayment,
} from '@/components/checkout/Context/Context'
import Details from '@/components/checkout/Details/Details'
import KiboStepper from '@/components/checkout/KiboStepper/KiboStepper'
import Payment from '@/components/checkout/Payment/Payment'
import Review from '@/components/checkout/Review/Review'
import Shipping from '@/components/checkout/Shipping/Shipping'

const Checkout = () => {
  const { t } = useTranslation('common')

  const buttonLabels = [t('go-to-shipping'), t('go-to-payment'), t('review-order')]
  const steps = [t('details'), t('shipping'), t('payment'), t('review')]

  // Define Refs
  type DetailsFormHanlder = ElementRef<typeof Details>
  type ShippingFormHanlder = ElementRef<typeof Shipping>
  type PaymentFormHandler = ElementRef<typeof Payment>
  const detailsRef = useRef<DetailsFormHanlder | null>(null)
  const shippingRef = useRef<ShippingFormHanlder | null>(null)
  const paymentRef = useRef<PaymentFormHandler | null>(null)

  // State
  const [activeStep, setActiveStep] = useState<number>(0)
  const [userEnteredDetails, setUserEnteredDetails] = useState<UserEnteredDetails | null>(null)
  const [userEnteredShipping, setUserEnteredShipping] = useState<UserEnteredShipping | null>(null)
  const [userEnteredPayment, setUserEnteredPayment] = useState<UserEnteredPayment | null>(null)

  // Handlers
  const activeStepName = steps[activeStep]
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  const handleNext = () => {
    if (activeStepName === (t('details') as string))
      detailsRef.current && detailsRef.current.validateForm()
    if (activeStepName === (t('shipping') as string))
      shippingRef.current && shippingRef.current.validateForm()
    if (activeStepName === (t('payment') as string))
      paymentRef.current && paymentRef.current.validateForm()
  }
  const isFormValid = () => {
    let isValid = false

    if (activeStepName === (t('details') as string))
      isValid = userEnteredDetails?.isFormValid || false
    if (activeStepName === (t('shipping') as string))
      isValid = userEnteredShipping?.isFormValid || false
    if (activeStepName === (t('payment') as string))
      isValid = userEnteredPayment?.isFormValid || false

    return isValid
  }

  // Fetch data
  const detailsFromAPI = {
    // query fetch
    email: '',
    showAccountFields: false,
    firstName: '',
    lastName: '',
    password: '',
  }

  useEffect(() => {
    if (isFormValid()) setActiveStep(activeStep + 1)
  }, [userEnteredDetails, userEnteredShipping, userEnteredPayment]) // Mutation save

  return (
    <Stack direction="row" gap={3}>
      <Stack sx={{ width: '100%', maxWidth: '872px' }} gap={3}>
        <Typography variant="h1" component="div" gutterBottom>
          {t('checkout', { numberOfItems: 3 })}
        </Typography>

        <KiboStepper
          steps={steps}
          activeStep={activeStep}
          setUserEnteredDetails={setUserEnteredDetails}
          setUserEnteredShipping={setUserEnteredShipping}
          setUserEnteredPayment={setUserEnteredPayment}
        >
          <Details detailsFromAPI={detailsFromAPI} ref={detailsRef} />
          <Shipping shippingFromAPI={null} ref={shippingRef} />
          <Payment paymentFromAPI={null} ref={paymentRef} />
          <Review />
        </KiboStepper>
      </Stack>

      {/* TODO: Below code will be replaced with OrderSymmery component */}
      <Box>
        {activeStep < buttonLabels.length && (
          <Stack direction="row" gap={5}>
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              style={{ textTransform: 'none' }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              disabled={activeStep === steps.length - 1}
              onClick={handleNext}
              style={{ textTransform: 'none' }}
            >
              {buttonLabels[activeStep]}
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  )
}

export default Checkout
