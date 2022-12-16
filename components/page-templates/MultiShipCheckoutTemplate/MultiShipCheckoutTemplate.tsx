import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { DetailsStep, MultiShippingStep, PaymentStep, ReviewStep } from '@/components/checkout'
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
  useCreateMultiShipCheckoutMutation,
} from '@/hooks'
import { checkoutGetters, userGetters } from '@/lib/getters'

import type {
  CustomerContact,
  Checkout,
  CheckoutGroupRates,
  CrShippingRate,
  Maybe,
} from '@/lib/gql/types'
interface CheckoutProps {
  checkout: Checkout
}

const MultiShipCheckoutTemplate = (props: CheckoutProps) => {
  const { checkout: initialCheckout } = props

  const router = useRouter()
  const checkoutId = router?.query?.checkoutId
  // States
  const [promoError, setPromoError] = useState<string>('')

  // Hooks
  const { data: checkout } = useMultiShipCheckoutQueries({
    checkoutId: checkoutId as string,
    initialCheckout,
  })
  const updateMultiShipCheckoutPersonalInfo = useUpdateMultiShipCheckoutPersonalInfoMutation()
  const createCheckoutDestination = useCreateCheckoutDestinationMutations()
  const createCheckoutShippingMethod = useCreateCheckoutShippingMethodMutation()
  const createOrder = useCreateMultiShipCheckoutMutation()

  const { data: shippingMethods } = useCheckoutShippingMethodsQuery(
    checkoutId as string,
    checkout?.groupings && (checkout?.groupings[0]?.destinationId as string)
  )

  const updateCheckoutPersonalInfo = async (formData: PersonalDetails) => {
    const { email } = formData
    const personalInfo: MultiShipPersonalInfo = {
      checkout: checkout as Checkout,
      email: email as string,
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

  const getShippingRateFromMethodGroupByMethodCode = async (
    shippingMethodGroup: CheckoutGroupRates,
    shippingMethodCode: string
  ) =>
    shippingMethodGroup?.shippingRates?.find(
      (shippingRate: Maybe<CrShippingRate>) =>
        shippingRate?.shippingMethodCode === shippingMethodCode
    )
  const updateCheckoutShippingMethod = async (params: {
    shippingMethodGroup: CheckoutGroupRates
    shippingMethodCode: string
  }) => {
    const { shippingMethodGroup, shippingMethodCode } = params
    const shippingRate = await getShippingRateFromMethodGroupByMethodCode(
      shippingMethodGroup,
      shippingMethodCode
    )

    await createCheckoutShippingMethod.mutateAsync({
      checkoutId: checkout?.id as string,
      checkoutGroupShippingMethodInput: [
        {
          groupingId: shippingMethodGroup?.groupingId as string,
          shippingRate,
        },
      ],
    })
  }

  const personalDetails = {
    email: checkout && checkout.email,
    showAccountFields: false,
    firstName: (checkout && checkout?.alternateContact?.firstName) || '',
    lastNameOrSurname: (checkout && checkout?.alternateContact?.lastNameOrSurname) || '',
    password: '',
  }

  const orderSummaryProps = {
    subTotal: checkout?.subTotal,
    shippingTotal: checkout?.shippingTotal,
    taxTotal: checkoutGetters.getTaxTotal(checkout as Checkout),
    total: checkout?.total,
  }

  const handleCreateOrder = (checkout: Checkout) => {
    // need to be implemented
    createOrder.mutateAsync(checkout)
    console.log('handleCreateOrder called.....')
  }

  const { shipItems, pickupItems } = checkoutGetters.getCheckoutDetails(checkout as Checkout)

  return (
    <>
      <CheckoutUITemplate
        checkout={checkout as Checkout}
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
            userSavedShippingAddress={userShippingAddress}
            isAuthenticated={isAuthenticated}
            shippingMethods={shippingMethods}
            createCheckoutDestination={createCheckoutDestination}
            onUpdateCheckoutShippingMethod={updateCheckoutShippingMethod}
          />
        )}
        {/*<PaymentStep checkout={checkout}  />*/}
        <ReviewStep
          checkout={checkout as CommonCheckout<CrOrder, Checkout>}
          shipItems={shipItems}
          pickupItems={pickupItems}
          personalDetails={personalDetails}
          orderSummaryProps={orderSummaryProps}
          onCreateOrder={handleCreateOrder}
          isMultiShipEnabled={true}
        />
      </CheckoutUITemplate>
    </>
  )
}

export default MultiShipCheckoutTemplate
