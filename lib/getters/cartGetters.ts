import { Cart } from '../gql/types'

const getCartItemCount = (cart: Cart) => cart?.items?.length || 0
const getCartItems = (cart: Cart) => cart?.items || []

export const cartGetters = {
  getCartItemCount,
  getCartItems,
}
