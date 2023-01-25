import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { DetailsStep, PaymentStep, ReviewStep, StandardShippingStep } from '@/components/checkout'
import { CheckoutUITemplate } from '@/components/page-templates'
import { useCheckoutStepContext, useAuthContext } from '@/context'
import {
  useCheckoutQueries,
  useCustomerContactsQueries,
  useUpdateOrderCouponMutation,
  useDeleteOrderCouponMutation,
  useUpdateCheckoutPersonalInfoMutation,
  PersonalInfo,
  useUpdateCheckoutBillingInfoMutation,
  useCreateCheckoutPaymentMethodMutation,
  useUpdateOrderPaymentActionMutation,
  useCreateOrderMutation,
} from '@/hooks'
import { orderGetters, userGetters } from '@/lib/getters'
import type { PersonalDetails } from '@/lib/types'

import type { CustomerContact, CrOrder, CrOrderInput, PaymentActionInput } from '@/lib/gql/types'

interface StandardShipCheckoutProps {
  checkout: CrOrder
  isMultiShipEnabled: boolean
}

const StandardShipCheckoutTemplate = (props: StandardShipCheckoutProps) => {
  const { checkout: initialCheckout, isMultiShipEnabled } = props
  const router = useRouter()
  const [promoError, setPromoError] = useState<string>('')
  const { checkoutId } = router.query

  const { data: checkout } = useCheckoutQueries({
    checkoutId: checkoutId as string,
    isMultiship: isMultiShipEnabled,
    initialCheckout,
  })

  const { isAuthenticated, user } = useAuthContext()
  const { data: savedUserAddressData } = useCustomerContactsQueries(user?.id as number)
  const updateOrderCoupon = useUpdateOrderCouponMutation()
  const deleteOrderCoupon = useDeleteOrderCouponMutation()

  const { setStepBack } = useCheckoutStepContext()

  const handleBack = () => setStepBack()

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

  const userShippingAddress = userGetters?.getUserShippingAddress(
    savedUserAddressData?.items as CustomerContact[]
  )

  const updateStandardCheckoutPersonalInfo = useUpdateCheckoutPersonalInfoMutation()

  const updateCheckoutPersonalInfo = async (formData: PersonalDetails) => {
    const { email } = formData

    const personalInfo: PersonalInfo = {
      checkout: checkout as CrOrderInput,
      email: email as string,
    }
    await updateStandardCheckoutPersonalInfo.mutateAsync(personalInfo)
  }

  // Payment Step

  const updateOrderPaymentAction = useUpdateOrderPaymentActionMutation()
  const createOrderPaymentMethod = useCreateCheckoutPaymentMethodMutation()
  const updateCheckoutBillingInfo = useUpdateCheckoutBillingInfoMutation()

  const handleVoidPayment = async (
    id: string,
    paymentId: string,
    paymentAction: PaymentActionInput
  ) => {
    await updateOrderPaymentAction.mutateAsync({
      orderId: id as string,
      paymentId,
      paymentAction,
    })
  }

  const handleAddPayment = async (id: string, paymentAction: PaymentActionInput) => {
    await createOrderPaymentMethod.mutateAsync({ orderId: id, paymentAction })
    await updateCheckoutBillingInfo.mutateAsync({
      orderId: id,
      billingInfoInput: { ...paymentAction.newBillingInfo },
    })
  }

  //Review Step
  const createOrder = useCreateOrderMutation()

  const orderDetails = orderGetters.getCheckoutDetails(checkout as CrOrder)

  const personalDetails = {
    ...orderDetails.personalDetails,
    showAccountFields: false,
    password: '',
  }

  const handleCreateOrder = (checkout: CrOrder) => {
    console.log('handleCreateOrder called standard :')
    createOrder.mutateAsync(checkout)
  }

  const { shipItems, pickupItems } = orderGetters.getCheckoutDetails(checkout as CrOrder)

  return (
    <>
      <CheckoutUITemplate
        checkout={checkout as CrOrder}
        handleApplyCouponCode={handleApplyCouponCode}
        handleRemoveCouponCode={handleRemoveCouponCode}
        promoError={promoError}
      >
        <DetailsStep
          checkout={checkout as CrOrder}
          updateCheckoutPersonalInfo={updateCheckoutPersonalInfo}
        />
        <StandardShippingStep
          checkout={checkout as CrOrder}
          userShippingAddress={userShippingAddress}
          isAuthenticated={isAuthenticated}
        />
        <PaymentStep
          checkout={checkout as CrOrder}
          onVoidPayment={handleVoidPayment}
          onAddPayment={handleAddPayment}
        />
        <ReviewStep
          checkout={checkout as CrOrder}
          isMultiShipEnabled={isMultiShipEnabled}
          shipItems={shipItems}
          pickupItems={pickupItems}
          personalDetails={personalDetails}
          orderSummaryProps={orderDetails?.orderSummary}
          onCreateOrder={handleCreateOrder}
        />
      </CheckoutUITemplate>
    </>
  )
}

export default StandardShipCheckoutTemplate
