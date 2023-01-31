import React, { useCallback } from 'react'

import { Box, Stack, Button, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { KiboStepper, OrderReview } from '@/components/checkout'
import { OrderSummary, PromoCodeBadge } from '@/components/common'
import { OrderConfirmation } from '@/components/order'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'

import type { Checkout, CrOrder } from '@/lib/gql/types'

interface CheckoutUITemplateProps<T> {
  checkout: T
  promoError: string
  handleApplyCouponCode: (couponCode: string) => void
  handleRemoveCouponCode: (couponCode: string) => void
  children?: React.ReactNode
}
const buttonStyle = {
  height: '42px',
  fontSize: (themeParam: Theme) => themeParam.typography.subtitle1,
} as SxProps<Theme> | undefined

const CheckoutUITemplate = <T extends CrOrder | Checkout>(props: CheckoutUITemplateProps<T>) => {
  const { checkout, handleApplyCouponCode, handleRemoveCouponCode, promoError, children } = props
  const { t } = useTranslation('common')
  const { activeStep, stepStatus, steps, setStepStatusSubmit, setStepBack } =
    useCheckoutStepContext()
  const buttonLabels = [t('go-to-shipping'), t('go-to-payment'), t('review-order')]
  const detailsStepIndex = steps.findIndex(
    (step: string) => step.toLowerCase() === t('details').toLowerCase()
  )
  const reviewStepIndex = steps.findIndex(
    (step: string) => step.toLowerCase() === t('review').toLowerCase()
  )
  const handleBack = () => setStepBack()
  const handleSubmit = useCallback(() => setStepStatusSubmit(), [])

  const subTotal = (checkout as CrOrder)?.subtotal || (checkout as Checkout)?.subTotal

  const discountedSubtotal =
    (checkout as CrOrder)?.discountedSubtotal ||
    (checkout as Checkout).itemLevelProductDiscountTotal +
      (checkout as Checkout)?.orderLevelProductDiscountTotal
  const tax = (checkout as CrOrder)?.taxTotal || (checkout as CrOrder)?.itemTaxTotal

  const orderSummaryArgs = {
    nameLabel: t('order-summary'),
    subTotalLabel: `Cart Subtotal of (${checkout?.items?.length} items)`,
    shippingTotalLabel: t('standard-shopping'),
    taxLabel: t('tax'),
    totalLabel: t('order-total'),
    subTotal: t('currency', { val: subTotal }),

    discountedSubtotal:
      discountedSubtotal > 0 && discountedSubtotal !== subTotal
        ? t('currency', { val: discountedSubtotal })
        : '',
    shippingTotal: checkout?.shippingTotal
      ? t('currency', { val: checkout?.shippingTotal })
      : t('free'),
    tax: t('currency', { val: tax || 0 }),
    total: t('currency', { val: checkout?.total }),
    checkoutLabel: t('go-to-checkout'),
    shippingLabel: t('go-to-shipping'),
    backLabel: t('go-back'),
    promoComponent: (
      <PromoCodeBadge
        onApplyCouponCode={handleApplyCouponCode}
        onRemoveCouponCode={handleRemoveCouponCode}
        promoList={checkout?.couponCodes as string[]}
        promoError={!!promoError}
        helpText={promoError}
      />
    ),
  }
  const showCheckoutSteps = activeStep !== steps.length

  return (
    <>
      {showCheckoutSteps && (
        <Stack
          sx={{ paddingTop: '20px', paddingBottom: { md: '40px' } }}
          direction={{ xs: 'column', md: 'row' }}
          gap={2}
        >
          <Stack sx={{ width: '100%', maxWidth: '872px' }} gap={1}>
            <KiboStepper isSticky={true}>{children}</KiboStepper>
          </Stack>
          <Box
            sx={{
              width: '100%',
              maxWidth: 428,
              height: 'fit-content',
              marginLeft: { lg: '1rem' },
              position: { md: 'sticky' },
              top: '80px',
            }}
          >
            {activeStep != reviewStepIndex && (
              <OrderSummary {...orderSummaryArgs}>
                {activeStep < buttonLabels.length && (
                  <Stack direction="column" gap={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ ...buttonStyle }}
                      fullWidth
                      onClick={handleSubmit}
                      disabled={stepStatus !== STEP_STATUS.VALID || activeStep === steps.length - 1}
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
            {activeStep === reviewStepIndex && <OrderReview checkout={checkout as CrOrder} />}
          </Box>
        </Stack>
      )}
      {!showCheckoutSteps && (
        <Stack sx={{ paddingY: 8 }}>
          <OrderConfirmation order={checkout as CrOrder} />
        </Stack>
      )}
    </>
  )
}
export default CheckoutUITemplate
