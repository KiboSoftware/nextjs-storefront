import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { DetailsStep, MultiShippingStep, PaymentStep, ReviewStep } from '@/components/checkout'
import { CheckoutUITemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import {
  useGetCustomerAddresses,
  useDeleteCheckoutCoupon,
  useGetCurrentCheckout,
  useUpdateCheckoutPersonalInfo,
  useUpdateCheckoutCoupon,
  MultiShipPersonalInfo,
  useCreateDestination,
  useGetCheckoutShippingMethods,
  useCreateCheckoutShippingMethod,
  useVoidCheckoutPayment,
  useAddCheckoutPayment,
  useCreateCheckout,
} from '@/hooks'
import { FulfillmentOptions } from '@/lib/constants'
import { checkoutGetters } from '@/lib/getters'
import type { PersonalDetails } from '@/lib/types'

import type {
  Checkout,
  CheckoutGroupRates,
  CrShippingRate,
  Maybe,
  PaymentActionInput,
} from '@/lib/gql/types'

interface MultiShipCheckoutProps {
  checkout: Checkout
  isMultiShipEnabled: boolean
}

interface MultiShipCheckoutShippingMethod {
  shippingMethodCode: string
  shippingMethodGroup: CheckoutGroupRates
}

const MultiShipCheckoutTemplate = (props: MultiShipCheckoutProps) => {
  const { checkout: initialCheckout, isMultiShipEnabled } = props

  const router = useRouter()
  const checkoutId = router?.query?.checkoutId
  // States
  const [promoError, setPromoError] = useState<string>('')

  // Hooks
  const { data: checkout } = useGetCurrentCheckout({
    checkoutId: checkoutId as string,
    isMultiShip: isMultiShipEnabled,
    initialCheckout,
  })
  const { data: shippingMethods } = useGetCheckoutShippingMethods(
    checkoutId as string,
    checkout?.groupings &&
      checkout?.groupings
        ?.filter((group) => group?.fulfillmentMethod === FulfillmentOptions.SHIP)
        .map((each) => each?.destinationId)
        .join(',')
  )

  const { updateMultiShipCheckoutPersonalInfo } = useUpdateCheckoutPersonalInfo()
  const { createCheckoutDestination } = useCreateDestination()
  const { createCheckoutShippingMethod } = useCreateCheckoutShippingMethod()
  const { updateCheckoutCoupon } = useUpdateCheckoutCoupon()
  const { deleteCheckoutCoupon } = useDeleteCheckoutCoupon()

  const updateCheckoutPersonalInfo = async (formData: PersonalDetails) => {
    const { email } = formData
    const personalInfo: MultiShipPersonalInfo = {
      checkout: checkout as Checkout,
      email: email as string,
    }
    await updateMultiShipCheckoutPersonalInfo.mutateAsync(personalInfo)
  }

  const { isAuthenticated, user } = useAuthContext()
  const { data: savedUserAddressData } = useGetCustomerAddresses(user?.id as number)

  const getShippingRateFromMethodGroupByMethodCode = async (
    shippingMethodCode: string,
    shippingMethodGroup: CheckoutGroupRates
  ) =>
    shippingMethodGroup?.shippingRates?.find(
      (shippingRate: Maybe<CrShippingRate>) =>
        shippingRate?.shippingMethodCode === shippingMethodCode
    )
  const updateCheckoutShippingMethod = async (params: MultiShipCheckoutShippingMethod) => {
    const { shippingMethodGroup, shippingMethodCode } = params
    const shippingRate = await getShippingRateFromMethodGroupByMethodCode(
      shippingMethodCode,
      shippingMethodGroup
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

  const handleApplyCouponCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateCheckoutCoupon.mutateAsync({
        checkoutId: checkoutId as string,
        couponCode,
      })
      if (response?.invalidCoupons?.length) {
        setPromoError(`<strong>${couponCode}</strong> ${response?.invalidCoupons[0]?.reason}`)
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

  // Payment Step
  const { voidCheckoutPayment } = useVoidCheckoutPayment()
  const { addCheckoutPayment } = useAddCheckoutPayment()

  const handleVoidPayment = async (
    id: string,
    paymentId: string,
    paymentActionInput: PaymentActionInput
  ) => {
    await voidCheckoutPayment.mutateAsync({
      checkoutId: id,
      paymentId,
      paymentActionInput,
    })
  }

  const handleAddPayment = async (id: string, paymentAction: PaymentActionInput) => {
    await addCheckoutPayment.mutateAsync({
      checkoutId: id,
      paymentAction,
    })
  }

  // Review Step
  const { createCheckout } = useCreateCheckout()

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

  const handleCreateCheckout = async (checkout: Checkout) => {
    await createCheckout.mutateAsync(checkout)
  }

  const { shipItems, pickupItems } = checkoutGetters.getCheckoutDetails(checkout as Checkout)

  return (
    <>
      <CheckoutUITemplate
        checkout={checkout as Checkout}
        handleApplyCouponCode={handleApplyCouponCode}
        handleRemoveCouponCode={handleRemoveCouponCode}
        promoError={promoError}
        isMultiShipEnabled={true}
      >
        <DetailsStep
          checkout={checkout as Checkout}
          updateCheckoutPersonalInfo={updateCheckoutPersonalInfo}
        />
        <MultiShippingStep
          key={checkout?.groupings?.map((group) => group?.id).join('')}
          checkout={checkout as Checkout}
          savedUserAddressData={savedUserAddressData}
          isAuthenticated={isAuthenticated}
          shippingMethods={shippingMethods}
          createCheckoutDestination={createCheckoutDestination}
          onUpdateCheckoutShippingMethod={updateCheckoutShippingMethod}
        />
        <PaymentStep
          checkout={checkout as Checkout}
          isMultiShipEnabled={isMultiShipEnabled}
          onVoidPayment={handleVoidPayment}
          onAddPayment={handleAddPayment}
        />
        <ReviewStep
          checkout={checkout as Checkout}
          isMultiShipEnabled={isMultiShipEnabled}
          shipItems={shipItems}
          pickupItems={pickupItems}
          personalDetails={personalDetails}
          orderSummaryProps={orderSummaryProps}
          onCreateOrder={handleCreateCheckout}
        />
      </CheckoutUITemplate>
    </>
  )
}

export default MultiShipCheckoutTemplate
