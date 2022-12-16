import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { DetailsStep, ReviewStep, PaymentStep, StandardShippingStep } from '@/components/checkout'
import { PersonalDetails } from '@/components/checkout/DetailsStep/DetailsStep'
import { CheckoutUITemplate } from '@/components/page-templates'
import { useCheckoutStepContext, useAuthContext } from '@/context'
import {
  useCheckoutQueries,
  useCustomerContactsQueries,
  useUpdateOrderCouponMutation,
  useDeleteOrderCouponMutation,
  useUpdateCheckoutPersonalInfoMutation,
  PersonalInfo,
  useCreateOrderMutation,
} from '@/hooks'
import { orderGetters, userGetters } from '@/lib/getters'

import type { CustomerContact, CrOrder, CrOrderInput } from '@/lib/gql/types'

interface CheckoutProps {
  checkout: CrOrder
}

const StandardShipCheckoutTemplate = (props: CheckoutProps) => {
  const { checkout: initialCheckout } = props
  const router = useRouter()
  const [promoError, setPromoError] = useState<string>('')
  const { checkoutId } = router.query

  const { data: checkout } = useCheckoutQueries({
    checkoutId: checkoutId as string,
    initialCheckout,
  })

  const { isAuthenticated, user } = useAuthContext()
  const { data: savedUserAddressData, isSuccess } = useCustomerContactsQueries(user?.id as number)
  const updateOrderCoupon = useUpdateOrderCouponMutation()
  const deleteOrderCoupon = useDeleteOrderCouponMutation()
  const createOrder = useCreateOrderMutation()

  const { setStepBack } = useCheckoutStepContext()

  // const handleBack = () => setStepBack()

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
      orderId: checkout?.id as string,
      updateMode: 'ApplyToOriginal',
      orderInput: {
        ...(checkout as CrOrderInput),
        email,
      },
    }
    await updateStandardCheckoutPersonalInfo.mutateAsync(personalInfo)
  }
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
        isSuccess={isSuccess}
        promoError={promoError}
        userShippingAddress={userShippingAddress}
      >
        <DetailsStep checkout={checkout} updateCheckoutPersonalInfo={updateCheckoutPersonalInfo} />
        {((isAuthenticated && isSuccess) || !isAuthenticated) && (
          <StandardShippingStep
            checkout={checkout as CrOrder}
            userShippingAddress={userShippingAddress}
            isAuthenticated={isAuthenticated}
          />
        )}
        <PaymentStep checkout={checkout} />
        <ReviewStep
          checkout={checkout as CommonCheckout<CrOrder, Checkout>}
          shipItems={shipItems}
          pickupItems={pickupItems}
          personalDetails={personalDetails}
          orderSummaryProps={orderDetails?.orderSummary}
          onCreateOrder={handleCreateOrder}
          isMultiShipEnabled={true}
        />
      </CheckoutUITemplate>
    </>
  )
}

export default StandardShipCheckoutTemplate
