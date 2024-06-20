import React, { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import getConfig from 'next/config'
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
  useGetCards,
  useGetCustomerPurchaseOrderAccount,
  useCreateCustomerCard,
  useCreateCustomerAddress,
  useUpdateOrderShippingInfo,
} from '@/hooks'
import { AccountType, AddressType, DefaultId } from '@/lib/constants'
import { cartGetters, orderGetters } from '@/lib/getters'
import { buildCreateCustomerCardParam, buildAddressParams } from '@/lib/helpers'
import { cartKeys, checkoutKeys } from '@/lib/react-query/queryKeys'
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

  const { publicRuntimeConfig } = getConfig()
  const allowInvalidAddresses = publicRuntimeConfig.allowInvalidAddresses

  const { data: order } = useGetCurrentOrder({
    checkoutId: checkoutId as string,
    isMultiship: isMultiShipEnabled,
    initialCheckout,
  })

  const { isAuthenticated, user } = useAuthContext()
  const { data: addressCollection } = useGetCustomerAddresses(user?.id as number)
  const { data: cardCollection } = useGetCards(user?.id as number)
  const { createCustomerAddress } = useCreateCustomerAddress()
  const { createCustomerCard } = useCreateCustomerCard()
  const { updateOrderShippingInfo } = useUpdateOrderShippingInfo()
  const queryClient = useQueryClient()
  const isB2BUser = user?.accountType?.toLowerCase() === AccountType.B2B.toLowerCase()

  const { data: customerPurchaseOrderAccount } = useGetCustomerPurchaseOrderAccount(
    user?.id as number,
    isB2BUser
  )

  const { updateOrderCoupon } = useUpdateOrderCoupon()
  const { deleteOrderCoupon } = useDeleteOrderCoupon()

  const handleApplyCouponCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateOrderCoupon.mutateAsync({
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
      await deleteOrderCoupon.mutateAsync({
        checkoutId: checkoutId as string,
        couponCode,
      })
    } catch (err) {
      console.error(err)
    }
  }
  const handleAddTip = async (amount: string) => {
    const filterOrderItems = order?.items?.filter(
      (orderItem: any) =>
        orderItem?.product?.productType !==
        publicRuntimeConfig?.DeliverySolutionsDeliveryProductConfig?.productType
    )
    const packages = cartGetters.getPackagesDetails(filterOrderItems)
    const deliveryAddressDateAndWindow =
      typeof localStorage !== 'undefined' &&
      JSON.parse(localStorage.getItem('instant-delivery') as string)
    const updateOrderDataVariables = {
      params: {
        orderId: order?.id,
        orderDataId: 'ds',
        undefinedInput: {
          dsDescription: cartGetters.getDSDescription(
            deliveryAddressDateAndWindow,
            packages,
            +amount || 0,
            orderGetters.getDeliveryInstructions(order as CrOrder)
          ),
          dropoffTime: {
            startsAt:
              deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.startsAt.toString(),
            endsAt:
              deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.endsAt.toString(),
          },
          pickupTime: {
            startsAt:
              deliveryAddressDateAndWindow?.window?.confirmedWindow?.pickupTime?.startsAt.toString(),
          },
          deliveryInstructions: orderGetters.getDeliveryInstructions(order as CrOrder),
          pickupInstructions: '',
          tips: +amount,
          deliveryContact: {
            notifySms: deliveryAddressDateAndWindow?.notification?.isSendSMS || false,
            notifyEmail: deliveryAddressDateAndWindow?.notification?.isSendEmail || false,
            ...deliveryAddressDateAndWindow?.contact,
          },
          packages: [cartGetters.getPackagesDetails(filterOrderItems)],
          storeId: deliveryAddressDateAndWindow?.window?.confirmedStoreId,
        },
      },
    }
    const updateOrderDataResponse = await fetch('/api/update-order-data', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateOrderDataVariables),
    })
    const response = await updateOrderDataResponse.json()
    if (response) {
      queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
    }
  }
  const handleAddDeliveryInstructions = async (deliveryInstructions: string) => {
    const filterOrderItems = order?.items?.filter(
      (orderItem: any) =>
        orderItem?.product?.productType !==
        publicRuntimeConfig?.DeliverySolutionsDeliveryProductConfig?.productType
    )
    const packages = cartGetters.getPackagesDetails(filterOrderItems)
    const deliveryAddressDateAndWindow =
      typeof localStorage !== 'undefined' &&
      JSON.parse(localStorage.getItem('instant-delivery') as string)
    const updateOrderDataVariables = {
      params: {
        orderId: order?.id,
        orderDataId: 'ds',
        undefinedInput: {
          dsDescription: cartGetters.getDSDescription(
            deliveryAddressDateAndWindow,
            packages,
            orderGetters.getTipAmount(order as CrOrder),
            deliveryInstructions
          ),
          dropoffTime: {
            startsAt:
              deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.startsAt.toString(),
            endsAt:
              deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.endsAt.toString(),
          },
          pickupTime: {
            startsAt:
              deliveryAddressDateAndWindow?.window?.confirmedWindow?.pickupTime?.startsAt.toString(),
          },
          deliveryInstructions,
          pickupInstructions: '',
          tips: orderGetters.getTipAmount(order as CrOrder),
          deliveryContact: {
            notifySms: deliveryAddressDateAndWindow?.notification?.isSendSMS || false,
            notifyEmail: deliveryAddressDateAndWindow?.notification?.isSendEmail || false,
            ...deliveryAddressDateAndWindow?.contact,
          },
          packages: [cartGetters.getPackagesDetails(filterOrderItems)],
          storeId: deliveryAddressDateAndWindow?.window?.confirmedStoreId,
        },
      },
    }
    const updateOrderDataResponse = await fetch('/api/update-order-data', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateOrderDataVariables),
    })
    const response = await updateOrderDataResponse.json()
    if (response) {
      queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
    }
  }
  const { updateOrderPersonalInfo } = useUpdateOrderPersonalInfo()

  const updateCheckoutPersonalInfo = async (formData: PersonalDetails) => {
    const { email } = formData

    if (allowInvalidAddresses && order?.fulfillmentInfo?.fulfillmentContact?.address) {
      order.fulfillmentInfo.fulfillmentContact.address.isValidated = true
    }

    const personalInfo: PersonalInfo = {
      checkout: {
        ...order,
      } as CrOrderInput,
      email: email as string,
    }
    await updateOrderPersonalInfo.mutateAsync(personalInfo)
  }

  // Payment Step

  const { voidOrderPayment } = useVoidOrderPayment()
  const { addOrderPayment } = useAddOrderPaymentInfo()
  const { updateOrderBillingInfo } = useUpdateOrderBillingInfo()

  const handleVoidPayment = async (
    id: string,
    paymentId: string,
    paymentAction: PaymentActionInput
  ) => {
    await voidOrderPayment.mutateAsync({
      orderId: id as string,
      paymentId,
      paymentAction,
    })
  }

  const handleAddPayment = async (id: string, paymentAction: PaymentActionInput) => {
    await addOrderPayment.mutateAsync({ orderId: id, paymentAction })
    await updateOrderBillingInfo.mutateAsync({
      orderId: id,
      billingInfoInput: { ...paymentAction.newBillingInfo },
    })
  }

  //Review Step
  const { createOrder } = useCreateOrder()

  const orderDetails = orderGetters.getCheckoutDetails(order as CrOrder)

  const personalDetails = {
    ...orderDetails.personalDetails,
    showAccountFields: false,
    password: '',
  }

  const handleCreateOrder = async (order: CrOrder) => {
    const orderPayments = orderGetters.getNewOrderPayments(order as CrOrder)
    await createOrder.mutateAsync(order)

    if (orderPayments[0]?.billingInfo?.card?.isCardInfoSaved) {
      const address = {
        ...orderPayments[0].billingInfo.billingContact.address,
        contact: {
          ...orderPayments[0].billingInfo.billingContact,
          email: user?.emailAddress as string,
        },
      }
      const params = buildAddressParams({
        accountId: user?.id as number,
        address,
        isDefaultAddress: false,
        addressType: AddressType.BILLING,
      })
      const savedCustomerAddressRes = await createCustomerAddress.mutateAsync(params)

      const cardParams = buildCreateCustomerCardParam(
        orderPayments[0].billingInfo,
        user?.id as number,
        savedCustomerAddressRes.id
      )
      await createCustomerCard.mutateAsync(cardParams)
    }

    router.push(
      { pathname: '/order-confirmation', query: { checkoutId: order.id } },
      { pathname: '/order-confirmation' }
    )
  }

  const { shipItems, pickupItems, digitalItems, deliveryItems } = orderGetters.getCheckoutDetails(
    order as CrOrder
  )

  return (
    <>
      <CheckoutUITemplate
        checkout={order as CrOrder}
        handleApplyCouponCode={handleApplyCouponCode}
        handleRemoveCouponCode={handleRemoveCouponCode}
        handleAddTip={handleAddTip}
        handleAddDeliveryInstructions={handleAddDeliveryInstructions}
        promoError={promoError}
      >
        <DetailsStep
          checkout={order as CrOrder}
          updateCheckoutPersonalInfo={updateCheckoutPersonalInfo}
          isMultiShipEnabled={isMultiShipEnabled}
        />
        <StandardShippingStep
          checkout={order as CrOrder}
          savedUserAddressData={addressCollection}
          isAuthenticated={isAuthenticated}
          isMultiShipEnabled={isMultiShipEnabled}
        />
        <PaymentStep
          checkout={order as CrOrder}
          addressCollection={addressCollection}
          cardCollection={cardCollection}
          customerPurchaseOrderAccount={customerPurchaseOrderAccount}
          onVoidPayment={handleVoidPayment}
          onAddPayment={handleAddPayment}
          isMultiShipEnabled={false}
        />
        <ReviewStep
          checkout={order as CrOrder}
          isMultiShipEnabled={isMultiShipEnabled}
          shipItems={shipItems}
          pickupItems={pickupItems}
          digitalItems={digitalItems}
          deliveryItems={deliveryItems}
          personalDetails={personalDetails}
          orderSummaryProps={orderDetails?.orderSummary}
          onCreateOrder={handleCreateOrder}
        />
      </CheckoutUITemplate>
    </>
  )
}

export default StandardShipCheckoutTemplate
