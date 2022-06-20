import CartItem from '@/components/cart/CartItem/CartItem'

import type { CartItem as CartItemType } from '@/lib/gql/types'

interface CartItemListProps {
  cartItems: CartItemType[]
  onCartItemQuantityUpdate: (cartItemId: string, quantity: number) => void
  onCartItemDelete: (cartItemId: string) => void
  onCartItemActionSelection: () => void
}

const CartItemList = (props: CartItemListProps) => {
  const { cartItems, onCartItemQuantityUpdate, onCartItemDelete, onCartItemActionSelection } = props

  const handleQuantityUpdate = (cartItemId: string, quantity: number) =>
    onCartItemQuantityUpdate(cartItemId, quantity)

  const handleCartItemDelete = (cartItemId: string) => onCartItemDelete(cartItemId)

  const handleCartItemActionSelection = () => onCartItemActionSelection()

  return (
    <>
      {cartItems.map((item: CartItemType, index: number) => (
        <CartItem
          key={index}
          cartItem={item}
          maxQuantity={undefined}
          onQuantityUpdate={handleQuantityUpdate}
          onCartItemDelete={handleCartItemDelete}
          onCartItemActionSelection={handleCartItemActionSelection}
          fulfillmentOptions={[]}
        />
      ))}
    </>
  )
}

export default CartItemList
