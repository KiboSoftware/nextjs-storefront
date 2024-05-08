import React from 'react'

import { InstantDeliveryDialog, StoreLocatorDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import {
  useUpdateCartItem,
  useUpdateCartItemQuantity,
  useUpdateCurrentCart,
  useAddCartItem,
} from '@/hooks'
import { FulfillmentOptions } from '@/lib/constants'
import { LocationCustom } from '@/lib/types'

import { CrCartItem, CrCartItemInput, Maybe, Location } from '@/lib/gql/types'

interface UseCartActionsProps {
  cartItems: CrCartItem[]
  purchaseLocation: Location
}

export const useCartActions = ({ cartItems, purchaseLocation }: UseCartActionsProps) => {
  const { showModal, closeModal } = useModalContext()
  const { updateCartItem } = useUpdateCartItem()
  const { updateCartItemQuantity } = useUpdateCartItemQuantity()
  const { updateCurrentCart } = useUpdateCurrentCart()
  const { addToCart } = useAddCartItem()
  const deliveryAddressDateAndWindowFromLocalStorage =
    typeof localStorage !== 'undefined' &&
    JSON.parse(localStorage.getItem('delivery-address-date-and-window') as string)
  console.log(
    'deliveryAddressDateAndWindowFromLocalStorage',
    deliveryAddressDateAndWindowFromLocalStorage
  )

  const handleProductPickupLocation = (cartItemId: string) => {
    showModal({
      Component: StoreLocatorDialog,
      props: {
        handleSetStore: async (selectedStore: LocationCustom) => {
          mutateCartItem(cartItemId, FulfillmentOptions.PICKUP, selectedStore?.code)
          localStorage.removeItem('delivery-address-date-and-window')
          closeModal()
        },
      },
    })
  }

  const handleInstantDelivery = (cartItemId?: string) => {
    console.log('handleinstantnn', cartItemId)
    showModal({
      Component: InstantDeliveryDialog,
      props: {
        handleInstantDelivery: async (deliveryAddressDateAndWindow: any) => {
          console.log('selectedAddress', deliveryAddressDateAndWindow)
          const response = await mutateCartItem(
            cartItemId as string,
            FulfillmentOptions.DELIVERY,
            deliveryAddressDateAndWindow?.deliveryDateAndWindow?.confirmedStoreId
          )
          if (response?.id) {
            if (!deliveryAddressDateAndWindowFromLocalStorage) {
              await addToCart.mutateAsync({
                product: {
                  productCode: 'InstantDeliveryProduct',
                  variationProductCode: 'InstantDeliveryProduct',
                  fulfillmentMethod: FulfillmentOptions.DELIVERY,
                  options: [],
                  purchaseLocationCode: deliveryAddressDateAndWindow?.deliveryDateAndWindow
                    ?.confirmedStoreId as string,
                },
                quantity: 1,
              })
            }
            localStorage.setItem(
              'delivery-address-date-and-window',
              JSON.stringify(deliveryAddressDateAndWindow)
            )
          }
          console.log('response', response)
          closeModal()
        },
      },
    })
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
      localStorage.removeItem('delivery-address-date-and-window')
    }
  }

  const handleQuantityUpdate = async (cartItemId: string, quantity: number) => {
    try {
      await updateCartItemQuantity.mutateAsync({ cartItemId, quantity })
    } catch (err) {
      console.error(err)
    }
  }

  const handChangeDeliveryAddressDateAndTime = (deliveryAddressDateAndWindow: any) => {
    console.log('handChangeDeliveryAddressDateAndTime', deliveryAddressDateAndWindow)
    showModal({
      Component: InstantDeliveryDialog,
      props: {
        deliveryAddress: deliveryAddressDateAndWindow?.deliveryAddress,
        handleInstantDelivery: async (deliveryAddressDateAndWindow: any) => {
          handleUpdateCartItems(deliveryAddressDateAndWindow)
          closeModal()
        },
      },
    })
  }

  const handleUpdateCartItems = async (deliveryAddressDateAndWindow: any) => {
    const newCartItems = [...cartItems]
    newCartItems.forEach((item: CrCartItem) => {
      if (item?.fulfillmentMethod && item?.fulfillmentMethod === FulfillmentOptions.DELIVERY) {
        item.fulfillmentLocationCode =
          deliveryAddressDateAndWindow?.deliveryDateAndWindow?.confirmedStoreId
      }
    })
    try {
      const response = await updateCurrentCart.mutateAsync({
        cartInput: {
          items: newCartItems,
        },
      })
      console.log('response', response)
    } catch (err) {
      console.error(err)
    }
    localStorage.setItem(
      'delivery-address-date-and-window',
      JSON.stringify(deliveryAddressDateAndWindow)
    )
  }

  return {
    onFulfillmentOptionChange,
    handleQuantityUpdate,
    handleProductPickupLocation,
    handleInstantDelivery,
    handChangeDeliveryAddressDateAndTime,
  }
}
