import React, { useState, useRef, ElementRef } from 'react'

import { Box, Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { useCheckout, useUpdatePersonalInfo, PersonalInfo } from '../../../hooks'
import DetailsStep, { PersonalDetails } from '@/components/checkout/DetailsStep/DetailsStep'
import KiboStepper from '@/components/checkout/KiboStepper/KiboStepper'
import PaymentStep from '@/components/checkout/PaymentStep/PaymentStep'
import ReviewStep from '@/components/checkout/ReviewStep/ReviewStep'
import ShippingStep from '@/components/checkout/ShippingStep/ShippingStep'
import OrderSummary from '@/components/common/OrderSummary/OrderSummary'

import type { OrderInput } from '@/lib/gql/types'

const buttonStyle = {
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

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
  const { data: checkoutInfo, isLoading: _isCheckoutLoading } = useCheckout({
    cartId,
    checkoutId,
  })

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

  const orderSummeryArgs = {
    standardShippingAmount: 'Free',
    estimatedTaxAmout: '$13.73',
    orderTotal: '$233.72',
    subTotal: '$219.99',
    numberOfItems: '3 items',
    backLabel: 'Go Back',
    checkoutLabel: 'Go to Checkout',
    nameLabel: 'Order Summary',
    cartTotalLabel: 'Cart Subtotal',
    standardShippingLabel: 'Standard Shipping',
    estimatedTaxLabel: 'Tax',
    orderTotalLabel: 'Order Total',
    shippingLabel: 'Go to Shipping',
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

      <Box sx={{ width: '100%', maxWidth: 428, height: 448 }}>
        <OrderSummary {...orderSummeryArgs}>
          {activeStep < buttonLabels.length && (
            <Stack direction="column" gap={2}>
              <Button
                variant="contained"
                sx={{ ...buttonStyle }}
                fullWidth
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                {buttonLabels[activeStep]}
              </Button>
              <Button
                variant="contained"
                sx={{ ...buttonStyle }}
                fullWidth
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {t('go-back')}
              </Button>
            </Stack>
          )}
        </OrderSummary>
      </Box>
    </Stack>
  )
}

export default Checkout
