import React, { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import {
  DetailsStep,
  ReviewStep,
  PaymentStep,
  StandardShippingStep,
} from '@/components/checkout'
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
} from '@/hooks'
import { userGetters } from '@/lib/getters'

import type { CustomerContact, Order, OrderInput } from '@/lib/gql/types'

interface CheckoutProps {
  checkout: Order
}

const StandardShipCheckoutTemplate = (props: CheckoutProps) => {
  const { checkout: initialCheckout } = props
  const router = useRouter()
  const [promoError, setPromoError] = useState<string>('')
  const { checkoutId } = router.query

  const { t } = useTranslation('common')

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
      updateMode: 'ApplyToOriginal',
      orderInput: {
        ...(checkout as OrderInput),
        email,
      },
    }
    await updateStandardCheckoutPersonalInfo.mutateAsync(personalInfo)
  }

  return (
    <>
      <CheckoutUITemplate
        checkout={checkout as Order}
        handleApplyCouponCode={handleApplyCouponCode}
        handleRemoveCouponCode={handleRemoveCouponCode}
        isSuccess={isSuccess}
        promoError={promoError}
        userShippingAddress={userShippingAddress}
      >
        <DetailsStep checkout={checkout} updateCheckoutPersonalInfo={updateCheckoutPersonalInfo} />
        {((isAuthenticated && isSuccess) || !isAuthenticated) && (
          <StandardShippingStep
            checkout={checkout as Order}
            userShippingAddress={userShippingAddress}
            isAuthenticated={isAuthenticated}
          />
        )}
        <PaymentStep checkout={checkout} />
        <ReviewStep checkout={checkout as Order} onBackButtonClick={handleBack} />
      </CheckoutUITemplate>
    </>
  )
}

export default StandardShipCheckoutTemplate
