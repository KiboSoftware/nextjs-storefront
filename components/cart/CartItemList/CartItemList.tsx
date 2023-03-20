import { Box, Collapse } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'

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
  onCartItemDelete: (cartItemId: string) => Promise<void>
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

  const handleCartItemDelete = async (cartItemId: string) => await onCartItemDelete(cartItemId)

  const handleCartItemActionSelection = () => onCartItemActionSelection()

  const handleSupportedFulfillmentOptions = (cartItem: CrCartItem): FulfillmentOption[] => {
    const location =
      cartItem?.fulfillmentLocationCode && cartItem?.fulfillmentMethod === FulfillmentOptions.PICKUP
        ? cartGetters.getCartItemFulfillmentLocation(cartItem, fulfillmentLocations)
        : purchaseLocation
    return cartGetters.getProductFulfillmentOptions(cartItem, location)
  }

  return (
    <TransitionGroup>
      {cartItems?.map((item: Maybe<CrCartItem>, index: number) => (
        <Collapse
          // orientation="horizontal"
          key={`${item?.id}-${index}`}
          sx={{
            '.MuiCollapse-wrapperInner': {
              width: '100%',
            },
          }}
        >
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
        </Collapse>
      ))}
    </TransitionGroup>
  )
}

export default CartItemList
