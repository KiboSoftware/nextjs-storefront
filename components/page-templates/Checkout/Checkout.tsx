import React, { useState } from 'react'

import { Box, Stack, Button, Typography, SxProps, Divider, useMediaQuery } from '@mui/material'
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
import { PromoCodeBadge } from '@/components/common'
import { OrderConfirmation } from '@/components/order'
import { useCheckoutStepContext, STEP_STATUS, useAuthContext } from '@/context'
import {
  useCheckoutQueries,
  useCustomerContacts,
  useUpdateOrderCouponMutation,
  useDeleteOrderCouponMutation,
} from '@/hooks'
import { userAddressGetters } from '@/lib/getters'
import theme from '@/styles/theme'

import type { Order } from '@/lib/gql/types'
interface CheckoutProps {
  checkout: Order
  initialStep?: number
}

const buttonStyle = {
  height: '42px',
  fontSize: (themeParam: Theme) => themeParam.typography.subtitle1,
} as SxProps<Theme> | undefined

const Checkout = (props: CheckoutProps) => {
  const { checkout: initialCheckout } = props

  const [promoError, setPromoError] = useState<string>('')

  const { t } = useTranslation(['checkout'])
  const router = useRouter()

  const { checkoutId } = router.query
  const { data: checkout } = useCheckoutQueries({
    checkoutId: checkoutId as string,
    initialCheckout,
  })

  const { user } = useAuthContext()
  const { data: savedUserAddressData } = useCustomerContacts(user?.id as number)
  const updateOrderCoupon = useUpdateOrderCouponMutation()
  const deleteOrderCoupon = useDeleteOrderCouponMutation()

  const { activeStep, stepStatus, steps, setStepBack, setStepStatusSubmit } =
    useCheckoutStepContext()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const buttonLabels = [t('go-to-shipping'), t('go-to-payment'), t('review-order')]

  const detailsStepIndex = steps.findIndex(
    (step: string) => step.toLowerCase() === t('details').toLowerCase()
  )
  const reviewStepIndex = steps.findIndex(
    (step: string) => step.toLowerCase() === t('review').toLowerCase()
  )

  const handleBack = () => setStepBack()
  const handleSubmit = () => setStepStatusSubmit()

  const handleApplyCouponCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateOrderCoupon.mutateAsync({
        checkoutId: checkoutId as string,
        couponCode,
      })
      if (response?.invalidCoupons?.length) {
        setPromoError(response?.invalidCoupons[0]?.reason)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleRemoveCouponCode = async (couponCode: string) => {
    try {
      await deleteOrderCoupon.mutateAsync({
        checkoutId: checkoutId as string,
        couponCode,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const orderSummaryArgs = {
    nameLabel: t('order-summary'),
    subTotalLabel: `Cart Subtotal of (${checkout?.items?.length} items)`,
    shippingTotalLabel: t('common:standard-shopping'),
    taxLabel: t('common:tax'),
    totalLabel: t('common:order-total'),
    subTotal: t('common:currency', { val: checkout?.subtotal }),
    discountedSubtotal:
      checkout?.discountedSubtotal && checkout?.discountedSubtotal != checkout?.subtotal
        ? t('common:currency', { val: checkout?.discountedSubtotal })
        : '',
    shippingTotal: checkout?.shippingTotal
      ? t('common:currency', { val: checkout?.shippingTotal })
      : t('checkout:free'),
    tax: t('common:currency', { val: checkout?.taxTotal }),
    total: t('common:currency', { val: checkout?.total }),
    checkoutLabel: t('checkout:go-to-checkout'),
    shippingLabel: t('checkout:go-to-shipping'),
    backLabel: t('checkout:Go Back'),
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

  const paymentStepParams = {
    isUserLoggedIn: true,
  }

  const numberOfItems = checkout && checkout?.items && checkout?.items?.length
  const showCheckoutSteps = activeStep !== steps.length

  const userShippingAddress = userAddressGetters?.getUserShippingAddress(
    savedUserAddressData?.items
  )
  return (
    <>
      {showCheckoutSteps && (
        <Stack
          sx={{ paddingTop: '20px', paddingBottom: { md: '40px' } }}
          direction={{ xs: 'column', md: 'row' }}
          gap={2}
        >
          <Stack sx={{ width: '100%', maxWidth: '872px' }} gap={1}>
            <Typography variant={mdScreen ? 'h1' : 'h2'} component="div" gutterBottom>
              {t('checkout', { numberOfItems })}
            </Typography>

            {!mdScreen && (
              <Stack sx={{ paddingBottom: '8px' }}>
                <Divider />
              </Stack>
            )}

            <KiboStepper>
              <DetailsStep checkout={checkout} />
              <ShippingStep
                checkout={checkout as Order}
                userShippingAddress={userShippingAddress}
              />
              <PaymentStep checkout={checkout} {...paymentStepParams} />
              <ReviewStep checkout={checkout as Order} onBackButtonClick={handleBack} />
            </KiboStepper>
          </Stack>

          <Box
            sx={{
              width: '100%',
              maxWidth: 428,
              height: 448,
              paddingTop: { lg: '4.1rem' },
              marginLeft: { lg: '1rem' },
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
            {activeStep === reviewStepIndex && <OrderReview checkout={checkout as Order} />}
          </Box>
        </Stack>
      )}

      {!showCheckoutSteps && (
        <Stack sx={{ paddingY: '40px' }}>
          <OrderConfirmation order={checkout as Order} />
        </Stack>
      )}
    </>
  )
}

export default Checkout
