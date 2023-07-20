import { StoreLocatorDialog } from '@/components/dialogs'
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

  const mutateCartItem = async (
    cartItemId: string,
    fulfillmentMethod: string,
    locationCode = ''
  ) => {
    try {
      const cartItem = cartItems.find((item: Maybe<CrCartItem>) => item?.id === cartItemId)
      await updateCartItem.mutateAsync({
        cartItemInput: {
          ...(cartItem as CrCartItemInput),
          fulfillmentMethod,
          fulfillmentLocationCode: locationCode,
        },
        cartItemId: cartItemId,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const onFulfillmentOptionChange = async (fulfillmentMethod: string, cartItemId: string) => {
    const locationCode =
      fulfillmentMethod === FulfillmentOptions.PICKUP ? (purchaseLocation.code as string) : ''
    if (fulfillmentMethod === FulfillmentOptions.PICKUP && !locationCode) {
      handleProductPickupLocation(cartItemId)
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

  return {
    onFulfillmentOptionChange,
    handleQuantityUpdate,
    handleProductPickupLocation,
  }
}
