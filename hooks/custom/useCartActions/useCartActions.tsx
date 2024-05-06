import React from 'react'

import { InstantDeliveryDialog, StoreLocatorDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useUpdateCartItem, useUpdateCartItemQuantity } from '@/hooks'
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

  const [deliveryAddress, setDeliveryAddress] = React.useState<Maybe<any>>(null)

  const handleProductPickupLocation = (cartItemId: string) => {
    showModal({
      Component: StoreLocatorDialog,
      props: {
        handleSetStore: async (selectedStore: LocationCustom) => {
          mutateCartItem(cartItemId, FulfillmentOptions.PICKUP, selectedStore?.code)
          localStorage.removeItem('delivery-address')
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
        handleInstantDelivery: async (selectedAddress: any) => {
          console.log('selectedAddress', selectedAddress)
          const response = await mutateCartItem(
            cartItemId as string,
            FulfillmentOptions.DELIVERY,
            selectedAddress?.storeBoundary
          )
          if (response?.id) {
            localStorage.setItem(
              'delivery-address',
              JSON.stringify(selectedAddress.deliveryAddress)
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
      localStorage.removeItem('delivery-address')
    }
  }

  const handleQuantityUpdate = async (cartItemId: string, quantity: number) => {
    try {
      await updateCartItemQuantity.mutateAsync({ cartItemId, quantity })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    deliveryAddress,
    onFulfillmentOptionChange,
    handleQuantityUpdate,
    handleProductPickupLocation,
    handleInstantDelivery,
  }
}
