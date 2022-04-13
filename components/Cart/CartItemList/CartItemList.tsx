import CartItem from '@/components/cart/CartItem/CartItem'

import type { CartItem as CartItemType } from '@/lib/gql/types'

interface CartItemListProps {
  cartItems: CartItemType[]
  onCartItemQuantityUpdate: (cartItemId: string, quantity: number) => void
  onCartItemDelete: (cartItemId: string) => void
}

const CartItemList = (props: CartItemListProps) => {
  const { cartItems, onCartItemQuantityUpdate, onCartItemDelete } = props

  const handleQuantityUpdate = (cartItemId: string, quantity: number) =>
    onCartItemQuantityUpdate(cartItemId, quantity)

  const handleCartItemDelete = (cartItemId: string) => onCartItemDelete(cartItemId)

  return (
    <>
      {cartItems.map((item: CartItemType, index: number) => (
        <CartItem
          key={index}
          cartItem={item}
          maxQuantity={undefined}
          onQuantityUpdate={handleQuantityUpdate}
          onCartItemDelete={handleCartItemDelete}
        />
      ))}
    </>
  )
}

export default CartItemList
