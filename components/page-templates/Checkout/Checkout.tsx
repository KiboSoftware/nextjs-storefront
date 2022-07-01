import React, { useState } from 'react'

import { Box, Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import {
  DetailsStep,
  KiboStepper,
  ReviewStep,
  ShippingStep,
  PaymentStep,
  OrderReview,
  OrderSummary,
} from '@/components/checkout'
import type { Action } from '@/components/checkout'
import { FormStates } from '@/lib/constants'

import type { Order } from '@/lib/gql/types'
interface CheckoutProps {
  checkout: Order
  initialStep?: number
}

const buttonStyle = {
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

const Checkout = (props: CheckoutProps) => {
  const { checkout, initialStep = 0 } = props

  const { t } = useTranslation(['checkout', 'common'])

  const buttonLabels = [t('go-to-shipping'), t('go-to-payment'), t('review-order')]
  const steps = [t('common:details'), t('shipping'), t('payment'), t('review')]

  // State
  const [activeStep, setActiveStep] = useState<number>(initialStep)
  const [activeStepStatus, setActiveStepStatus] = useState<string>(FormStates.INCOMPLETE)

  const detailsStepIndex = steps.findIndex((step) => step === t('common:details'))
  const reviewStepIndex = steps.findIndex((step) => step === t('review'))

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    setActiveStepStatus(FormStates.VALIDATE)
  }

  const completeStepCallback = (action: Action) => {
    setActiveStepStatus(FormStates.INCOMPLETE)
    if (action.type === FormStates.COMPLETE) {
      setActiveStep(activeStep + 1)
    }
  }

  const orderSummaryArgs = {
    nameLabel: t('order-summary'),
    subTotalLabel: `Cart Subtotal of (${checkout?.items?.length} items)`,
    shippingTotalLabel: 'Standard Shipping',
    taxLabel: 'Tax',
    totalLabel: 'Order Total',
    subTotal: t('common:currency', { val: checkout?.subtotal }),
    shippingTotal: t('free'),
    tax: t('common:currency', { val: checkout?.taxTotal }),
    total: t('common:currency', { val: checkout?.total }),
    checkoutLabel: 'Go to Checkout',
    shippingLabel: 'Go to Shipping',
    backLabel: 'Go Back',
  }

  const paymentStepParams = {
    isUserLoggedIn: true,
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
          <ShippingStep
            checkout={checkout}
            stepperStatus={activeStepStatus}
            onCompleteCallback={completeStepCallback}
          />
          <PaymentStep
            checkout={checkout}
            stepperStatus={activeStepStatus}
            {...paymentStepParams}
            onCompleteCallback={completeStepCallback}
          />
          <ReviewStep
            checkout={checkout}
            stepperStatus={activeStepStatus}
            onCompleteCallback={completeStepCallback}
            onBackButtonClick={handleBack}
          />
        </KiboStepper>
      </Stack>

      <Box sx={{ width: '100%', maxWidth: 428, height: 448, paddingTop: '4.313rem' }}>
        {activeStep != reviewStepIndex && (
          <OrderSummary {...orderSummaryArgs}>
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
                  color="secondary"
                  sx={{ ...buttonStyle }}
                  fullWidth
                  onClick={handleBack}
                  disabled={activeStep === detailsStepIndex}
                >
                  {t('go-back')}
                </Button>
              </Stack>
            )}
          </OrderSummary>
        )}
        {activeStep === reviewStepIndex && (
          <OrderReview checkout={checkout} steps={steps} setActiveStep={setActiveStep} />
        )}
      </Box>
    </Stack>
  )
}

export default Checkout
