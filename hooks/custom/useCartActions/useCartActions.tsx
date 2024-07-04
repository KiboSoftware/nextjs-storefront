import React from 'react'

import getConfig from 'next/config'

import { InstantDeliveryDialog, StoreLocatorDialog } from '@/components/dialogs'
import { useAuthContext, useModalContext } from '@/context'
import {
  useUpdateCartItem,
  useUpdateCartItemQuantity,
  useUpdateCurrentCart,
  useAddCartItem,
  useGetCustomerAddresses,
  useGetCart,
} from '@/hooks'
import { FulfillmentOptions } from '@/lib/constants'
import { cartGetters, orderGetters, userGetters } from '@/lib/getters'
import { LocationCustom } from '@/lib/types'

import { CrCartItem, CrCartItemInput, Maybe, Location, CustomerContact } from '@/lib/gql/types'
interface UseCartActionsProps {
  cartItems: CrCartItem[]
  purchaseLocation: Location
}

export const useCartActions = ({ cartItems, purchaseLocation }: UseCartActionsProps) => {
  const { publicRuntimeConfig } = getConfig()
  const { showModal, closeModal } = useModalContext()
  const { updateCartItem } = useUpdateCartItem()
  const { updateCartItemQuantity } = useUpdateCartItemQuantity()
  const { updateCurrentCart } = useUpdateCurrentCart()
  const { addToCart } = useAddCartItem()
  const { data: cart, refetch } = useGetCart()
  const { isAuthenticated, user } = useAuthContext()
  const { data: addressCollection } = useGetCustomerAddresses(user?.id as number)
  const defaultShippingAddress =
    userGetters.getDefaultShippingAddress(
      addressCollection?.items as unknown as CustomerContact[]
    ) || null
  const deliveryAddressDateAndWindowFromLocalStorage =
    typeof localStorage !== 'undefined' &&
    JSON.parse(localStorage.getItem('instant-delivery') as string)

  const handleProductPickupLocation = (cartItemId: string) => {
    showModal({
      Component: StoreLocatorDialog,
      props: {
        handleSetStore: async (selectedStore: LocationCustom) => {
          mutateCartItem(cartItemId, FulfillmentOptions.PICKUP, selectedStore?.code)
          closeModal()
        },
      },
    })
  }

  const handleInstantDelivery = async (cartItemId?: string) => {
    if (deliveryAddressDateAndWindowFromLocalStorage) {
      await mutateCartItem(
        cartItemId as string,
        FulfillmentOptions.DELIVERY,
        deliveryAddressDateAndWindowFromLocalStorage?.window?.confirmedStoreId
      )
    } else {
      showModal({
        Component: InstantDeliveryDialog,
        props: {
          instantDelivery: {
            contact: defaultShippingAddress ? defaultShippingAddress : null,
          },
          handleInstantDelivery: async (instantDelivery: any) => {
            const response = await mutateCartItem(
              cartItemId as string,
              FulfillmentOptions.DELIVERY,
              instantDelivery?.window?.confirmedStoreId
            )
            if (response?.id) {
              if (!deliveryAddressDateAndWindowFromLocalStorage) {
                await addToCart.mutateAsync({
                  product: {
                    productCode:
                      publicRuntimeConfig?.DeliverySolutionsDeliveryProductConfig?.productCode,
                    variationProductCode:
                      publicRuntimeConfig?.DeliverySolutionsDeliveryProductConfig?.productCode,
                    fulfillmentMethod: FulfillmentOptions.DELIVERY,
                    options: [],
                    purchaseLocationCode: instantDelivery?.window?.confirmedStoreId as string,
                  },
                  quantity: 1,
                })
              }
              localStorage.setItem('instant-delivery', JSON.stringify(instantDelivery))
            }
            const refetchCartData = await refetch()
            const updateCurrentCartesponse = await updateCurrentCart.mutateAsync({
              cartInput: {
                ...refetchCartData?.data,
                data: {
                  ds: cartGetters.getCustomDataForCartOrOrder({
                    cartOrOrderResponse: refetchCartData?.data,
                    deliveryDateAndWindow: instantDelivery,
                  }),
                },
              },
            })
            closeModal()
          },
        },
      })
    }
  }

  const mutateCartItem = async (
    cartItemId: string,
    fulfillmentMethod: string,
    locationCode = ''
  ) => {
    try {
      const cartItem = cartItems.find((item: Maybe<CrCartItem>) => item?.id === cartItemId)
      const response = await updateCartItem.mutateAsync({
        cartItemInput: {
          ...(cartItem as CrCartItemInput),
          fulfillmentMethod,
          fulfillmentLocationCode: locationCode,
        },
        cartItemId: cartItemId,
      })
      return response
    } catch (err) {
      console.log(err)
    }
  }

  const onFulfillmentOptionChange = async (fulfillmentMethod: string, cartItemId: string) => {
    const locationCode =
      fulfillmentMethod === FulfillmentOptions.PICKUP ? (purchaseLocation.code as string) : ''
    if (fulfillmentMethod === FulfillmentOptions.PICKUP && !locationCode) {
      handleProductPickupLocation(cartItemId)
    } else if (fulfillmentMethod === FulfillmentOptions.DELIVERY) {
      handleInstantDelivery(cartItemId)
    } else {
      mutateCartItem(cartItemId, fulfillmentMethod, locationCode)
    }
  }

  const handleQuantityUpdate = async (cartItemId: string, quantity: number) => {
    try {
      await updateCartItemQuantity.mutateAsync({ cartItemId, quantity })
    } catch (err) {
      console.error(err)
    }
  }

  const handChangeDeliveryAddressDateAndTime = ({
    deliveryAddress,
    deliveryStoreBoundary,
    deliveryNotification,
    deliveryWindow,
  }: {
    deliveryAddress: any
    deliveryStoreBoundary: any
    deliveryNotification: any
    deliveryWindow: any
  }) => {
    showModal({
      Component: InstantDeliveryDialog,
      props: {
        instantDelivery: {
          contact: deliveryAddress,
          storeBoundary: deliveryStoreBoundary,
          notification: deliveryNotification,
          window: deliveryWindow,
        },
        handleInstantDelivery: async (deliveryAddressDateAndWindow: any) => {
          handleUpdateCartItems(deliveryAddressDateAndWindow)
          closeModal()
        },
      },
    })
  }

  const handleUpdateCartItems = async (instantDelivery: any) => {
    const newCartItems = [...cartItems]
    newCartItems.forEach((item: CrCartItem) => {
      if (item?.fulfillmentMethod && item?.fulfillmentMethod === FulfillmentOptions.DELIVERY) {
        item.fulfillmentLocationCode = instantDelivery?.window?.confirmedStoreId
      }
    })
    try {
      const updatedCartFilterItems = newCartItems?.filter(
        (cartItem: any) =>
          cartItem?.product?.productType !==
          publicRuntimeConfig?.DeliverySolutionsDeliveryProductConfig?.productType
      )
      const packages = cartGetters.getPackagesDetails(updatedCartFilterItems)
      const response = await updateCurrentCart.mutateAsync({
        cartInput: {
          items: newCartItems,
          data: {
            ds: {
              dropoffTime: {
                startsAt:
                  instantDelivery?.window?.confirmedWindow?.dropoffTime?.startsAt.toString(),
                endsAt: instantDelivery?.window?.confirmedWindow?.dropoffTime?.endsAt.toString(),
              },
              pickupTime: {
                startsAt: instantDelivery?.window?.confirmedWindow?.pickupTime?.startsAt.toString(),
              },
              deliveryInstructions: orderGetters.getDeliveryInstructions(cart) || '',
              pickupInstructions: '',
              tips: orderGetters.getTipAmount(cart) || 0,
              deliveryContact: {
                notifySms: instantDelivery?.notification?.isSendSMS || false,
                notifyEmail: instantDelivery?.notification?.isSendEmail || false,
                ...instantDelivery?.contact,
              },
              packages: [cartGetters.getPackagesDetails(updatedCartFilterItems)],
              storeId: instantDelivery?.window?.confirmedStoreId,
              dsDescription: cartGetters.getDSDescription(
                instantDelivery,
                packages,
                orderGetters.getTipAmount(cart) || 0,
                orderGetters.getDeliveryInstructions(cart)
              ),
            },
          },
        },
      })
    } catch (err) {
      console.error(err)
    }
    localStorage.setItem('instant-delivery', JSON.stringify(instantDelivery))
  }

  return {
    onFulfillmentOptionChange,
    handleQuantityUpdate,
    handleProductPickupLocation,
    handleInstantDelivery,
    handChangeDeliveryAddressDateAndTime,
  }
}
