import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { DetailsStep, PaymentStep, ReviewStep, StandardShippingStep } from '@/components/checkout'
import { CheckoutUITemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import {
  useGetCurrentOrder,
  useGetCustomerAddresses,
  useUpdateOrderCoupon,
  useDeleteOrderCoupon,
  useUpdateOrderPersonalInfo,
  PersonalInfo,
  useUpdateOrderBillingInfo,
  useAddOrderPaymentInfo,
  useVoidOrderPayment,
  useCreateOrder,
} from '@/hooks'
import { orderGetters } from '@/lib/getters'
import type { PersonalDetails } from '@/lib/types'

import type { CrOrder, CrOrderInput, PaymentActionInput } from '@/lib/gql/types'

interface StandardShipCheckoutProps {
  checkout: CrOrder
  isMultiShipEnabled: boolean
}

const StandardShipCheckoutTemplate = (props: StandardShipCheckoutProps) => {
  const { checkout: initialCheckout, isMultiShipEnabled } = props
  const router = useRouter()
  const [promoError, setPromoError] = useState<string>('')
  const { checkoutId } = router.query

  const { data: checkout } = useGetCurrentOrder({
    checkoutId: checkoutId as string,
    isMultiship: isMultiShipEnabled,
    initialCheckout,
  })

  const { isAuthenticated, user } = useAuthContext()
  const { data: savedUserAddressData } = useGetCustomerAddresses(user?.id as number)
  const updateOrderCoupon = useUpdateOrderCoupon()
  const deleteOrderCoupon = useDeleteOrderCoupon()

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

  const updateStandardCheckoutPersonalInfo = useUpdateOrderPersonalInfo()

  const updateCheckoutPersonalInfo = async (formData: PersonalDetails) => {
    const { email } = formData

    const personalInfo: PersonalInfo = {
      checkout: checkout as CrOrderInput,
      email: email as string,
    }
    await updateStandardCheckoutPersonalInfo.mutateAsync(personalInfo)
  }

  // Payment Step

  const updateOrderPaymentAction = useVoidOrderPayment()
  const createOrderPaymentMethod = useAddOrderPaymentInfo()
  const updateCheckoutBillingInfo = useUpdateOrderBillingInfo()

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
  const createOrder = useCreateOrder()

  const orderDetails = orderGetters.getCheckoutDetails(checkout as CrOrder)

  const personalDetails = {
    ...orderDetails.personalDetails,
    showAccountFields: false,
    password: '',
  }

  const handleCreateOrder = async (checkout: CrOrder) => {
    await createOrder.mutateAsync(checkout)
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
          savedUserAddressData={savedUserAddressData}
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
