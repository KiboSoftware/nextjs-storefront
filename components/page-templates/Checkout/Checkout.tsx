import React, { useState } from 'react'

import { Box, Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { useCheckout } from '../../../hooks'
import DetailsStep, { Action } from '@/components/checkout/DetailsStep/DetailsStep'
import KiboStepper from '@/components/checkout/KiboStepper/KiboStepper'
import PaymentStep from '@/components/checkout/PaymentStep/PaymentStep'
import ReviewStep from '@/components/checkout/ReviewStep/ReviewStep'
import ShippingStep from '@/components/checkout/ShippingStep/ShippingStep'
import OrderSummary from '@/components/common/OrderSummary/OrderSummary'

import type { Order } from '@/lib/gql/types'

interface CheckoutProps {
  checkout: Order
}

const buttonStyle = {
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

const Checkout = (props: CheckoutProps) => {
  const { checkout } = props

  const { t } = useTranslation('checkout')

  const buttonLabels = [t('go-to-shipping'), t('go-to-payment'), t('review-order')]
  const steps = [t('details'), t('shipping'), t('payment'), t('review')]

  // State
  const [activeStep, setActiveStep] = useState<number>(0)
  const [activeStepStatus, setActiveStepStatus] = useState<string>('INCOMPLETE')

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    setActiveStepStatus('VALIDATE')
  }

  const completeStepCallback = (action: Action) => {
    setActiveStepStatus('INCOMPLETE')
    if (action.type === 'COMPLETE') {
      setActiveStep(activeStep + 1)
    }
  }

  const orderSummeryArgs = {
    standardShippingAmount: 'Free',
    estimatedTaxAmout: `${checkout?.taxTotal}`,
    orderTotal: `${checkout?.total}`,
    subTotal: `${checkout?.subtotal}`,
    numberOfItems: `${checkout?.items?.length} items`,
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
            checkout={checkout}
            stepperStatus={activeStepStatus}
            onCompleteCallback={completeStepCallback}
          />
          <ShippingStep />
          <PaymentStep />
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
