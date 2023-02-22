import { Box } from '@mui/material'

import { CartItem } from '@/components/cart'
import { FullWidthDivider } from '@/components/common'
import { FulfillmentOptions } from '@/lib/constants'
import { cartGetters } from '@/lib/getters/cartGetters'
import { FulfillmentOption } from '@/lib/types'

import type { CrCartItem, Location, Maybe, Product } from '@/lib/gql/types'

interface CartItemListProps {
  cartItems: Maybe<CrCartItem>[]
  fulfillmentLocations: Location[]
  purchaseLocation: Location
  onCartItemQuantityUpdate: (cartItemId: string, quantity: number) => void
  onCartItemDelete: (cartItemId: string) => void
  onCartItemActionSelection: () => void
  onFulfillmentOptionSelection: (fulfillmentMethod: string, cartItemId: string) => void
  onProductPickupLocation: (cartItemId: string) => void
}

const CartItemList = (props: CartItemListProps) => {
  const {
    cartItems,
    fulfillmentLocations = [],
    purchaseLocation,
    onCartItemQuantityUpdate,
    onCartItemDelete,
    onCartItemActionSelection,
    onFulfillmentOptionSelection,
    onProductPickupLocation,
  } = props

  const handleQuantityUpdate = (cartItemId: string, quantity: number) =>
    onCartItemQuantityUpdate(cartItemId, quantity)

  const handleCartItemDelete = (cartItemId: string) => onCartItemDelete(cartItemId)

  const handleCartItemActionSelection = () => onCartItemActionSelection()

  const handleSupportedFulfillmentOptions = (cartItem: CrCartItem): FulfillmentOption[] => {
    const location =
      cartItem?.fulfillmentLocationCode && cartItem?.fulfillmentMethod === FulfillmentOptions.PICKUP
        ? cartGetters.getCartItemFulfillmentLocation(cartItem, fulfillmentLocations)
        : purchaseLocation
    return cartGetters.getProductFulfillmentOptions(cartItem, location)
  }

  return (
    <>
      {cartItems?.map((item: Maybe<CrCartItem>, index: number) => (
        <Box key={`${item?.id}-${index}`}>
          <CartItem
            cartItem={item}
            key={item?.id}
            maxQuantity={undefined}
            onQuantityUpdate={handleQuantityUpdate}
            onCartItemDelete={handleCartItemDelete}
            onCartItemActionSelection={handleCartItemActionSelection}
            fulfillmentOptions={handleSupportedFulfillmentOptions(item as CrCartItem)}
            onFulfillmentOptionChange={onFulfillmentOptionSelection}
            onProductPickupLocation={onProductPickupLocation}
          />
          <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
            <FullWidthDivider />
          </Box>
        </Box>
      ))}
    </>
  )
}

export default CartItemList
