import { quoteFragment } from '../../../fragments'

const createQuoteItemMutation = /* GraphQL */ `
  mutation createQuoteItem(
    $quoteId: String!
    $updateMode: String
    $orderItemInput: CrOrderItemInput
  ) {
    createQuoteItem(quoteId: $quoteId, updateMode: $updateMode, orderItemInput: $orderItemInput) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default createQuoteItemMutation
