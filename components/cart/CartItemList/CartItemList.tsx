import CartItem from '@/components/cart/CartItem/CartItem'

import type { CartItem as CartItemType, Maybe } from '@/lib/gql/types'

interface CartItemListProps {
  cartItems: Maybe<CartItemType>[]
  onCartItemQuantityUpdate: (cartItemId: string, quantity: number) => void
  onCartItemDelete: (cartItemId: string) => void
  onCartItemActionSelection: () => void
  onFulfillmentOptionSelection: () => void
}

const CartItemList = (props: CartItemListProps) => {
  const {
    cartItems,
    onCartItemQuantityUpdate,
    onCartItemDelete,
    onCartItemActionSelection,
    onFulfillmentOptionSelection,
  } = props

  const handleQuantityUpdate = (cartItemId: string, quantity: number) =>
    onCartItemQuantityUpdate(cartItemId, quantity)

  const handleCartItemDelete = (cartItemId: string) => onCartItemDelete(cartItemId)

  const handleCartItemActionSelection = () => onCartItemActionSelection()

  return (
    <>
      {cartItems?.map((item: Maybe<CartItemType>, index: number) => (
        <CartItem
          key={'cart-item' + index}
          cartItem={item}
          maxQuantity={undefined}
          onQuantityUpdate={handleQuantityUpdate}
          onCartItemDelete={handleCartItemDelete}
          onCartItemActionSelection={handleCartItemActionSelection}
          fulfillmentOptions={[]}
          onFulfillmentOptionSelection={onFulfillmentOptionSelection}
        />
      ))}
    </>
  )
}

export default CartItemList
