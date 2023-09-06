import { quoteFragment } from '../../../fragments'

const createQuoteFromCartMutation = /* GraphQL */ `
  mutation createQuoteFromCart($cartId: String!, $updateMode: String) {
    createQuoteFromCart(cartId: $cartId, updateMode: $updateMode) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default createQuoteFromCartMutation
