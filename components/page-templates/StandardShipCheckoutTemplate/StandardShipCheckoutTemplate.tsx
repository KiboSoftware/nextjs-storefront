import React, { useState } from 'react'

import { Box, Stack, Button, SxProps } from '@mui/material'
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
  StandardShippingStep,
} from '@/components/checkout'
import { OrderSummary, PromoCodeBadge } from '@/components/common'
import { OrderConfirmation } from '@/components/order'
import { useCheckoutStepContext, STEP_STATUS, useAuthContext } from '@/context'
import {
  useCheckoutQueries,
  useCustomerContactsQueries,
  useUpdateOrderCouponMutation,
  useDeleteOrderCouponMutation,
  useUpdateCheckoutPersonalInfoMutation,
  useUpdateCheckoutShippingInfoMutation,
  useShippingMethodsQueries,
} from '@/hooks'
import { userGetters } from '@/lib/getters'

import type { CustomerContact, Order } from '@/lib/gql/types'
interface CheckoutProps {
  checkout: Order
  initialStep?: number
}

const buttonStyle = {
  height: '42px',
  fontSize: (themeParam: Theme) => themeParam.typography.subtitle1,
} as SxProps<Theme> | undefined

// import {somehooks} from 'standard ship checkout hook'
const StandardShipCheckoutTemplate = (props: CheckoutProps) => {
  //  const {method1, method2 ...} = somehooks()
  //<kiboStepper>
  //  <DetailsStep {...props} method1={method1}/>

  // <ShippingStep {...props} method2={method2}/>

  // <PaymentStep {...props} />
  // <ReviewStep {...props} />
  //   <kiboStepper>

  const { checkout: initialCheckout } = props
  const router = useRouter()
  const [promoError, setPromoError] = useState<string>('')
  const { checkoutId: queryCheckoutId } = router.query
  // States
  const [checkoutId, setCheckoutId] = useState<string | null | undefined>(queryCheckoutId)
  const [isNewAddressAdded, setIsNewAddressAdded] = useState<boolean>(false)
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<number>(null) //assign default  checkoutShippingContact?.id as number

  const { t } = useTranslation('common')

  const { data: checkout } = useCheckoutQueries({
    checkoutId: checkoutId as string,
    initialCheckout,
  })

  const { isAuthenticated, user } = useAuthContext()
  const { data: savedUserAddressData, isSuccess } = useCustomerContactsQueries(user?.id as number)
  const updateOrderCoupon = useUpdateOrderCouponMutation()
  const deleteOrderCoupon = useDeleteOrderCouponMutation()
  const { data: shippingMethods } = useShippingMethodsQueries(
    checkoutId,
    isNewAddressAdded,
    selectedShippingAddressId
  )

  const { activeStep, stepStatus, steps, setStepBack, setStepStatusSubmit } =
    useCheckoutStepContext()

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
    shippingTotalLabel: t('standard-shopping'),
    taxLabel: t('tax'),
    totalLabel: t('order-total'),
    subTotal: t('currency', { val: checkout?.subtotal }),
    discountedSubtotal:
      checkout?.discountedSubtotal && checkout?.discountedSubtotal != checkout?.subtotal
        ? t('currency', { val: checkout?.discountedSubtotal })
        : '',
    shippingTotal: checkout?.shippingTotal
      ? t('currency', { val: checkout?.shippingTotal })
      : t('free'),
    tax: t('currency', { val: checkout?.taxTotal }),
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

  const paymentStepParams = {
    isUserLoggedIn: true,
  }

  const showCheckoutSteps = activeStep !== steps.length

  const userShippingAddress = userGetters?.getUserShippingAddress(
    savedUserAddressData?.items as CustomerContact[]
  )

  const updateStandardCheckoutPersonalInfo = useUpdateCheckoutPersonalInfoMutation()
  const updateStandardCheckoutShippingInfo = useUpdateCheckoutShippingInfoMutation()

  const updateCheckoutPersonalInfo = async (formData: PersonalDetails) => {
    const { email } = formData

    const personalInfo: PersonalInfo = {
      orderId: checkout?.id as string,
      updateMode: 'ApplyToOriginal',
      orderInput: {
        ...(checkout as OrderInput),
        email,
      },
    }
    await updateStandardCheckoutPersonalInfo.mutateAsync(personalInfo)
  }

  const updateCheckoutShippingInfo = async (shippingInfo: any) => {
    console.log('updateCheckoutShippingInfo')
    await updateStandardCheckoutShippingInfo.mutateAsync(shippingInfo)
  }
  return (
    <>
      {showCheckoutSteps && (
        <Stack
          sx={{ paddingTop: '20px', paddingBottom: { md: '40px' } }}
          direction={{ xs: 'column', md: 'row' }}
          gap={2}
        >
          <Stack sx={{ width: '100%', maxWidth: '872px' }} gap={1}>
            <KiboStepper isSticky={true}>
              <DetailsStep
                checkout={checkout}
                updateCheckoutPersonalInfo={updateCheckoutPersonalInfo}
              />
              {((isAuthenticated && isSuccess) || !isAuthenticated) && (
                <StandardShippingStep
                  checkout={checkout as Order}
                  userShippingAddress={userShippingAddress}
                  isAuthenticated={isAuthenticated}
                />
              )}
              <PaymentStep checkout={checkout} {...paymentStepParams} />
              <ReviewStep checkout={checkout as Order} onBackButtonClick={handleBack} />
            </KiboStepper>
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

export default StandardShipCheckoutTemplate
