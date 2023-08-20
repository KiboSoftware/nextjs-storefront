import { quoteFragment } from '../../../fragments'

const updateQuoteItemFulfillmentMutation = /* GraphQL */ `
  mutation updateQuoteItemFulfillment(
    $quoteId: String!
    $quoteItemId: String!
    $updateMode: String
    $orderItemInput: CrOrderItemInput
  ) {
    updateQuoteItemFulfillment(
      quoteId: $quoteId
      quoteItemId: $quoteItemId
      updateMode: $updateMode
      orderItemInput: $orderItemInput
    ) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default updateQuoteItemFulfillmentMutation
