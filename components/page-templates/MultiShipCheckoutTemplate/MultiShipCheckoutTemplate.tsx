import React, { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { DetailsStep, MultiShippingStep } from '@/components/checkout'
import type { PersonalDetails } from '@/components/checkout/DetailsStep/DetailsStep'
import { CheckoutUITemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import {
  useCustomerContactsQueries,
  useDeleteCheckoutCouponMutation,
  useMultiShipCheckoutQueries,
  useUpdateMultiShipCheckoutPersonalInfoMutation,
  useUpdateCheckoutCouponMutation,
  MultiShipPersonalInfo,
  useCreateCheckoutDestinationMutations,
  useCheckoutShippingMethodsQuery,
  useCreateCheckoutShippingMethodMutation,
} from '@/hooks'
import { userGetters } from '@/lib/getters'

import type { CustomerContact, Checkout } from '@/lib/gql/types'
interface CheckoutProps {
  checkout: Checkout
}

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
  const createCheckoutDestination = useCreateCheckoutDestinationMutations()
  const createCheckoutShippingMethod = useCreateCheckoutShippingMethodMutation()

  const { data: shippingMethods } = useCheckoutShippingMethodsQuery(
    checkoutId,
    isNewAddressAdded,
    checkout?.groupings && (checkout?.groupings[0]?.destinationId as string)
  )

  const updateCheckoutPersonalInfo = async (formData: PersonalDetails) => {
    const { email } = formData
    const personalInfo: MultiShipPersonalInfo = {
      checkout,
      email,
    }
    return await updateMultiShipCheckoutPersonalInfo.mutateAsync(personalInfo)
  }

  const { isAuthenticated, user } = useAuthContext()
  const { data: savedUserAddressData, isSuccess } = useCustomerContactsQueries(user?.id as number)
  const updateCheckoutCoupon = useUpdateCheckoutCouponMutation()
  const deleteCheckoutCoupon = useDeleteCheckoutCouponMutation()

  const handleApplyCouponCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateCheckoutCoupon.mutateAsync({
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
      await deleteCheckoutCoupon.mutateAsync({
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
          <MultiShippingStep
            checkout={checkout as Checkout}
            userShippingAddress={userShippingAddress}
            isAuthenticated={isAuthenticated}
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
      </CheckoutUITemplate>
    </>
  )
}

export default MultiShipCheckoutTemplate
