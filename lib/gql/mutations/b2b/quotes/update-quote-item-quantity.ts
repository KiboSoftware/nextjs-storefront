import { quoteFragment } from '../../../fragments'

const updateQuoteItemQuantityMutation = /* GraphQL */ `
  mutation updateQuoteItemQuantity(
    $quoteId: String!
    $quoteItemId: String!
    $quantity: Int!
    $updateMode: String
  ) {
    updateQuoteItemQuantity(
      quoteId: $quoteId
      quoteItemId: $quoteItemId
      quantity: $quantity
      updateMode: $updateMode
    ) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default updateQuoteItemQuantityMutation
