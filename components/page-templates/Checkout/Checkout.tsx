import React from 'react'

import { Box, Stack, Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import {
  DetailsStep,
  KiboStepper,
  ReviewStep,
  ShippingStep,
  PaymentStep,
  OrderReview,
  OrderSummary,
} from '@/components/checkout'
import { useCheckoutStepContext } from '@/context'
import { useCheckout } from '@/hooks'

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
  const { t } = useTranslation(['checkout'])
  const router = useRouter()

  const { checkoutId } = router.query
  const { data: checkout } = useCheckout({ cartId: undefined, checkoutId: checkoutId as string })

  const { activeStep, steps, setStepBack, setStepStatusSubmit } = useCheckoutStepContext()

  const buttonLabels = [t('go-to-shipping'), t('go-to-payment'), t('review-order')]

  const detailsStepIndex = steps.findIndex(
    (step: string) => step.toLowerCase() === t('details').toLowerCase()
  )
  const reviewStepIndex = steps.findIndex(
    (step: string) => step.toLowerCase() === t('review').toLowerCase()
  )

  const handleBack = () => setStepBack()
  const handleSubmit = () => setStepStatusSubmit()

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

        <KiboStepper>
          <DetailsStep checkout={checkout} />
          <ShippingStep checkout={checkout as Order} />
          <PaymentStep checkout={checkout} {...paymentStepParams} />
          <ReviewStep checkout={checkout as Order} onBackButtonClick={handleBack} />
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
                  onClick={handleSubmit}
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
        {activeStep === reviewStepIndex && <OrderReview checkout={checkout as Order} />}
      </Box>
    </Stack>
  )
}

export default Checkout
