import React, { useState, useRef, ElementRef } from 'react'

import { Box, Stack, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import {
  useLoadCheckout,
  useLoadFromCart,
  useUpdatePersonalInfo,
  PersonalInfo,
} from '../../../hooks'
import Details, { PersonalDetails } from '@/components/checkout/Details/Details'
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
  const [checkoutId, _setCheckoutId] = useState<string>('0')
  const [cartId, _setCartId] = useState<string>('0')

  // useCustomHooks
  const { data: checkoutInfo, isLoading: _isLoadCheckoutLoading } = useLoadCheckout(checkoutId)
  const { data: _cartInfo, isLoading: _isLoadFromCartLoading } = useLoadFromCart(cartId)
  const updatePersonalInfoMutation = useUpdatePersonalInfo()

  // Handlers
  const activeStepName = steps[activeStep]
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  const handleNext = () => {
    if (activeStepName === t('details').toString())
      detailsRef.current && detailsRef.current.validateForm()
    if (activeStepName === t('shipping').toString())
      shippingRef.current && shippingRef.current.validateForm()
    if (activeStepName === t('payment').toString())
      paymentRef.current && paymentRef.current.validateForm()
  }

  // TODO: Build Payload (separate out the logic) and call updatePersonalInfoMutation hook
  const handlePerosnalDetails = (userEnteredPersonalDetails: PersonalDetails) => {
    const { firstName, lastNameOrSurname, email } = userEnteredPersonalDetails
    const personalInfo: PersonalInfo = {
      orderId: checkoutInfo?.id as string,
      updateMode: 'ApplyToOriginal',
      orderInput: {
        ...checkoutInfo,
        email,
        amountAvailableForRefund: checkoutInfo?.amountAvailableForRefund as number,
        amountRefunded: checkoutInfo?.amountRefunded as number,
        amountRemainingForPayment: checkoutInfo?.amountRemainingForPayment as number,
        totalCollected: checkoutInfo?.totalCollected as number,
        fulfillmentInfo: {
          ...checkoutInfo?.fulfillmentInfo,
          fulfillmentContact: {
            ...checkoutInfo?.fulfillmentInfo?.fulfillmentContact,
            email,
            firstName,
            lastNameOrSurname,
          },
        },
      },
    }

    updatePersonalInfoMutation.mutate(personalInfo, {
      onSuccess: () => {
        setActiveStep(activeStep + 1)
      },
    })
  }

  // Call Queries
  const fulfillmentInfo = checkoutInfo?.fulfillmentInfo
  const fulfillmentContact = fulfillmentInfo && fulfillmentInfo?.fulfillmentContact

  const personalDetails = {
    email: (fulfillmentContact && fulfillmentContact.email) || '',
    showAccountFields: false,
    firstName: (fulfillmentContact && fulfillmentContact.firstName) || '',
    lastNameOrSurname: (fulfillmentContact && fulfillmentContact.lastNameOrSurname) || '',
    password: '',
  }

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} gap={3}>
      <Stack sx={{ width: '100%', maxWidth: '872px' }} gap={3}>
        <Typography variant="h1" component="div" gutterBottom>
          {t('checkout', { numberOfItems: 3 })}
        </Typography>
        <KiboStepper steps={steps} activeStep={activeStep}>
          <Details
            personalDetails={personalDetails}
            ref={detailsRef}
            onPersonalDetailsSave={handlePerosnalDetails}
          />
          <Shipping shippingFromAPI={null} ref={shippingRef} />
          <Payment paymentFromAPI={null} ref={paymentRef} />
          <Review />
        </KiboStepper>
      </Stack>

      {/* Below code will be replaced with OrderSymmery component */}
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
