import React, { useState, useRef, ElementRef } from 'react'

import { Box, Stack, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import {
  useLoadCheckout,
  useLoadFromCart,
  useUpdatePersonalInfo,
  PersonalInfo,
} from '../../../hooks'
import DetailsStep, { PersonalDetails } from '@/components/checkout/DetailsStep/DetailsStep'
import KiboStepper from '@/components/checkout/KiboStepper/KiboStepper'
import PaymentStep from '@/components/checkout/PaymentStep/PaymentStep'
import ReviewStep from '@/components/checkout/ReviewStep/ReviewStep'
import ShippingStep from '@/components/checkout/ShippingStep/ShippingStep'

import { OrderInput } from '@/lib/gql/types'

const Checkout = () => {
  const { t } = useTranslation('checkout')

  const buttonLabels = [t('go-to-shipping'), t('go-to-payment'), t('review-order')]
  const steps = [t('details'), t('shipping'), t('payment'), t('review')]

  // Define Refs
  type DetailsFormHanlder = ElementRef<typeof DetailsStep>
  type ShippingFormHanlder = ElementRef<typeof ShippingStep>
  type PaymentFormHandler = ElementRef<typeof PaymentStep>
  const detailsRef = useRef<DetailsFormHanlder | null>(null)
  const shippingRef = useRef<ShippingFormHanlder | null>(null)
  const paymentRef = useRef<PaymentFormHandler | null>(null)

  // State
  const [activeStep, setActiveStep] = useState<number>(0)
  // ToBe: state initial valies are just testing purpose later remove it
  const [checkoutId, _setCheckoutId] = useState<string>('137a979305c65d00010800230000678b')
  const [cartId, _setCartId] = useState<string>('137a94b6402be000013718d80000678b')

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

  // Refactor: Build Payload (separate out the logic) and call updatePersonalInfoMutation hook
  const handlePerosnalDetails = async (userEnteredPersonalDetails: PersonalDetails) => {
    const { email } = userEnteredPersonalDetails
    const personalInfo: PersonalInfo = {
      orderId: checkoutInfo?.id as string,
      updateMode: 'ApplyToOriginal',
      orderInput: {
        ...(checkoutInfo as OrderInput),
        email,
      },
    }

    try {
      await updatePersonalInfoMutation.mutateAsync(personalInfo)
      setActiveStep(activeStep + 1)
    } catch (error) {
      console.log(`error: ${error}`)
    } finally {
      console.log('done')
    }
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
          <DetailsStep
            personalDetails={personalDetails}
            ref={detailsRef}
            onPersonalDetailsSave={handlePerosnalDetails}
          />
          <ShippingStep shippingFromAPI={null} ref={shippingRef} />
          <PaymentStep paymentFromAPI={null} ref={paymentRef} />
          <ReviewStep />
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
