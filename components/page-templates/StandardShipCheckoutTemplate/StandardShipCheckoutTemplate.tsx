import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { DetailsStep, ReviewStep, PaymentStep, StandardShippingStep } from '@/components/checkout'
import { CheckoutUITemplate } from '@/components/page-templates'
import { useCheckoutStepContext, useAuthContext } from '@/context'
import {
  useCheckoutQueries,
  useCustomerContactsQueries,
  useUpdateOrderCouponMutation,
  useDeleteOrderCouponMutation,
  useUpdateCheckoutPersonalInfoMutation,
  PersonalInfo,
} from '@/hooks'
import { userGetters } from '@/lib/getters'
import type { PersonalDetails } from '@/lib/types'

import type { CustomerContact, CrOrder, CrOrderInput } from '@/lib/gql/types'

interface StandardShipCheckoutProps {
  checkout: CrOrder
}

const StandardShipCheckoutTemplate = (props: StandardShipCheckoutProps) => {
  const { checkout: initialCheckout } = props
  const router = useRouter()
  const [promoError, setPromoError] = useState<string>('')
  const { checkoutId } = router.query

  const { data: checkout } = useCheckoutQueries({
    checkoutId: checkoutId as string,
    isMultiship: true,
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
      checkout: checkout as CrOrderInput,
      email: email as string,
    }
    await updateStandardCheckoutPersonalInfo.mutateAsync(personalInfo)
  }

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
        {((isAuthenticated && isSuccess) || !isAuthenticated) && (
          <StandardShippingStep
            checkout={checkout as CrOrder}
            userShippingAddress={userShippingAddress}
            isAuthenticated={isAuthenticated}
          />
        )}
        <PaymentStep checkout={checkout} />
        <ReviewStep checkout={checkout as CrOrder} onBackButtonClick={handleBack} />
      </CheckoutUITemplate>
    </>
  )
}

export default StandardShipCheckoutTemplate
