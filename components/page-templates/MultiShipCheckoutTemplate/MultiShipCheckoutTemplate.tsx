import React, { useState } from 'react'

import { Box, Stack, Button, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { DetailsStep, KiboStepper, MultiShippingStep } from '@/components/checkout'
import type { PersonalDetails } from '@/components/checkout/DetailsStep/DetailsStep'
import { OrderSummary, PromoCodeBadge } from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS, useAuthContext } from '@/context'
import {
  useCustomerContactsQueries,
  useDeleteOrderCouponMutation,
  useMultiShipCheckoutQueries,
  useUpdateMultiShipCheckoutPersonalInfoMutation,
  useUpdateMultiShipCheckoutShippingInfoMutation,
  useUpdateOrderCouponMutation,
  MultiShipPersonalInfo,
  useCreateCheckoutDestinationMutations,
  useCheckoutShippingMethodsQuery,
  useCreateCheckoutShippingMethodMutation,
} from '@/hooks'
import { userGetters } from '@/lib/getters'

import type { CustomerContact, Checkout, CheckoutInput } from '@/lib/gql/types'

interface CheckoutProps {
  checkout: Checkout
}

const buttonStyle = {
  height: '42px',
  fontSize: (themeParam: Theme) => themeParam.typography.subtitle1,
} as SxProps<Theme> | undefined

const MultiShipCheckoutTemplate = (props: CheckoutProps) => {
  const { checkout: initialCheckout } = props

  const router = useRouter()
  const { checkoutId: queryCheckoutId } = router.query
  // States
  const [promoError, setPromoError] = useState<string>('')
  const [checkoutId, setCheckoutId] = useState<string | null | undefined>(queryCheckoutId as string)
  const [isNewAddressAdded, setIsNewAddressAdded] = useState<boolean>(false)
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<string>(0)

  // Hooks
  const { t } = useTranslation('common')
  const { data: checkout } = useMultiShipCheckoutQueries({
    checkoutId: checkoutId as string,
    initialCheckout,
  })
  const updateMultiShipCheckoutPersonalInfo = useUpdateMultiShipCheckoutPersonalInfoMutation()
  const updateMultiShipCheckoutShippingInfo = useUpdateMultiShipCheckoutShippingInfoMutation()
  const createCheckoutDestination = useCreateCheckoutDestinationMutations()
  const createCheckoutShippingMethod = useCreateCheckoutShippingMethodMutation()

  const { data: shippingMethods } = useCheckoutShippingMethodsQuery(
    checkoutId,
    isNewAddressAdded,
    checkout?.groupings[0]?.destinationId as string
  )

  const updateCheckoutPersonalInfo = async (formData: PersonalDetails) => {
    const { email } = formData
    const personalInfo: MultiShipPersonalInfo = {
      checkoutId: checkout?.id as string,
      checkoutInput: {
        ...(checkout as Checkout),
        email,
      } as CheckoutInput,
    }
    await updateMultiShipCheckoutPersonalInfo.mutateAsync(personalInfo)
  }

  const updateCheckoutShippingInfo = async (shippingInfo: any) => {
    await updateMultiShipCheckoutShippingInfo.mutateAsync(shippingInfo)
  }

  const { isAuthenticated, user } = useAuthContext()
  const { data: savedUserAddressData, isSuccess } = useCustomerContactsQueries(user?.id as number)
  const updateOrderCoupon = useUpdateOrderCouponMutation()
  const deleteOrderCoupon = useDeleteOrderCouponMutation()

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
    subTotal: t('currency', { val: checkout?.subTotal }),
    discountedSubtotal:
      checkout?.discountedSubtotal && checkout?.discountedSubtotal != checkout?.subTotal
        ? t('currency', { val: checkout?.discountedSubtotal })
        : '', //discountedSubtotal?
    shippingTotal: checkout?.shippingTotal
      ? t('currency', { val: checkout?.shippingTotal })
      : t('free'),
    tax: t('currency', { val: checkout?.itemTaxTotal }),
    // tax: t('currency', { val: checkout?.taxTotal }), //taxTotal?
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

  const updateCheckoutShippingMethod = async (params) => {
    const { shippingMethodGroup, shippingMethodCode } = params
    const shippingRate = shippingMethodGroup?.shippingRates?.find(
      (shippingRate) => shippingRate?.shippingMethodCode === shippingMethodCode
    )
    await createCheckoutShippingMethod.mutateAsync({
      checkoutId: checkout?.id as string,
      checkoutGroupShippingMethodInput: {
        groupingId: shippingMethodGroup?.groupingId as string,
        shippingRate,
      },
    })
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
                <MultiShippingStep
                  checkout={checkout as Checkout}
                  userShippingAddress={userShippingAddress}
                  isAuthenticated={isAuthenticated}
                  updateCheckoutShippingInfo={updateCheckoutShippingInfo}
                  shippingMethods={shippingMethods} //@to-do muse multiRate api
                  setCheckoutId={setCheckoutId}
                  setIsNewAddressAdded={setIsNewAddressAdded}
                  setSelectedShippingAddressId={setSelectedShippingAddressId}
                  isNewAddressAdded={isNewAddressAdded}
                  selectedShippingAddressId={selectedShippingAddressId}
                  createCheckoutDestination={createCheckoutDestination}
                  onUpdateCheckoutShippingMethod={updateCheckoutShippingMethod}
                />
              )}
              {/* @to-do Use below steps for future development */}
              {/* <PaymentStep checkout={checkout} {...paymentStepParams} />
              <ReviewStep checkout={checkout as Checkout} onBackButtonClick={handleBack} /> */}
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
            {/* @to-do Use below code during order review step */}
            {/* {activeStep === reviewStepIndex && <OrderReview checkout={checkout as Checkout} />} */}
          </Box>
        </Stack>
      )}

      {!showCheckoutSteps && (
        <Stack sx={{ paddingY: '40px' }}>
          {/* @to-do Use below code during order confirmation */}
          {/* <OrderConfirmation order={checkout as Checkout} /> */}
        </Stack>
      )}
    </>
  )
}

export default MultiShipCheckoutTemplate
