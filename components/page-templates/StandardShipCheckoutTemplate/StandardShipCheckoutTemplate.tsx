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
  useUpdateCheckoutBillingInfoMutation,
  useCreateCheckoutPaymentMethodMutation,
  useUpdateOrderPaymentActionMutation,
} from '@/hooks'
import { PersonalInfoUpdateMode } from '@/lib/constants'
import { userGetters } from '@/lib/getters'

import type { CustomerContact, CrOrder, CrOrderInput, PaymentActionInput } from '@/lib/gql/types'

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
      orderId: checkout?.id as string,
      updateMode: PersonalInfoUpdateMode.APPLYTOORIGINAL,
      orderInput: {
        ...(checkout as CrOrderInput),
        email,
      },
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
        <DetailsStep
          checkout={checkout as CrOrder}
          updateCheckoutPersonalInfo={updateCheckoutPersonalInfo}
        />
        {((isAuthenticated && isSuccess) || !isAuthenticated) && (
          <StandardShippingStep
            checkout={checkout as CrOrder}
            userShippingAddress={userShippingAddress}
            isAuthenticated={isAuthenticated}
          />
        )}
        <PaymentStep
          checkout={checkout as CrOrder}
          onVoidPayment={handleVoidPayment}
          onAddPayment={handleAddPayment}
        />
        <ReviewStep checkout={checkout as CrOrder} onBackButtonClick={handleBack} />
      </CheckoutUITemplate>
    </>
  )
}

export default StandardShipCheckoutTemplate
