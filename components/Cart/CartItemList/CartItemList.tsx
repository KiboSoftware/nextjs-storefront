import { useState } from 'react'

import CartItem from '@/components/cart/CartItem/CartItem'

import type { CartItem as CartItemType } from '@/lib/gql/types'

interface CartItemListProps {
  cartItems: CartItemType[]
}

const CartItemList = (props: CartItemListProps) => {
  const { cartItems } = props
  const [updatedCartItems, setUpdatedCartItems] = useState<CartItemType[]>(cartItems)

  const handleQuantityUpdate = (cartItemId: string, quantity: number) => {
    const index = updatedCartItems.findIndex((item) => item.id === cartItemId)
    updatedCartItems[index].quantity = quantity
    setUpdatedCartItems(updatedCartItems)
  }

  const handleCartItemDelete = (cartItemId: string) => {
    setUpdatedCartItems(updatedCartItems.filter((item) => item.id !== cartItemId))
  }

  return (
    <>
      {updatedCartItems.map((item: CartItemType, index: number) => (
        <CartItem
          key={index}
          cartItem={item}
          maxQuantity={item.quantity}
          onQuantityUpdate={handleQuantityUpdate}
          onCartItemDelete={handleCartItemDelete}
        />
      ))}
    </>
  )
}

export default CartItemList
