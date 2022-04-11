import CartItem from '@/components/Cart/CartItem/CartItem'

import type { CartItem as CartItemType } from '@/lib/gql/types'

interface CartItemListProps {
  cartItems: CartItemType[]
}

const CartItemList = (props: CartItemListProps) => {
  const { cartItems } = props

  const handleQuanityUpdate = (quantity: number) => {
    console.log(quantity)
  }

  return (
    <>
      {cartItems.map((item: CartItemType, index: number) => (
        <CartItem key={index} cartItem={item} onQuantityUpdate={handleQuanityUpdate}></CartItem>
      ))}
    </>
  )
}

export default CartItemList
