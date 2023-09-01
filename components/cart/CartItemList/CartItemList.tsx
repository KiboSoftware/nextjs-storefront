import { Box, Collapse } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'

import { CartItem } from '@/components/cart'
import { FullWidthDivider } from '@/components/common'
import { FulfillmentOptions } from '@/lib/constants'
import { cartGetters } from '@/lib/getters/cartGetters'
import { FulfillmentOption } from '@/lib/types'

import type { CrCartItem, CrOrderItem, Location, Maybe } from '@/lib/gql/types'

interface CartItemListProps {
  cartItems: Maybe<CrCartItem>[] | Maybe<CrOrderItem>[]
  fulfillmentLocations: Location[]
  purchaseLocation: Location
  status?: string
  mode?: string
  isQuote?: boolean
  onCartItemQuantityUpdate: (cartItemId: string, quantity: number) => void
  onCartItemDelete: (cartItemId: string) => void
  onCartItemActionSelection: () => void
  onFulfillmentOptionChange: (fulfillmentMethod: string, cartItemId: string) => void
  onProductPickupLocation: (cartItemId: string) => void
}

const CartItemList = (props: CartItemListProps) => {
  const {
    cartItems,
    fulfillmentLocations = [],
    purchaseLocation,
    status,
    mode,
    isQuote,
    onCartItemQuantityUpdate,
    onCartItemDelete,
    onCartItemActionSelection,
    onFulfillmentOptionChange,
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
    <TransitionGroup>
      {cartItems?.map((item: Maybe<CrCartItem> | Maybe<CrOrderItem>) => (
        <Collapse
          key={`${item?.id}`}
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
            status={status}
            mode={mode}
            isQuote={isQuote}
            onQuantityUpdate={handleQuantityUpdate}
            onCartItemDelete={handleCartItemDelete}
            onCartItemActionSelection={handleCartItemActionSelection}
            fulfillmentOptions={handleSupportedFulfillmentOptions(item as CrCartItem)}
            onFulfillmentOptionChange={onFulfillmentOptionChange}
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
