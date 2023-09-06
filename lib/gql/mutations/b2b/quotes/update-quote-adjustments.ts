import { quoteFragment } from '../../../fragments'

const updateQuoteAdjustmentsMutation = /* GraphQL */ `
  mutation updateQuoteAdjustments(
    $quoteId: String!
    $updateMode: String
    $quoteAdjustmentInput: QuoteAdjustmentInput
  ) {
    updateQuoteAdjustments(
      quoteId: $quoteId
      updateMode: $updateMode
      quoteAdjustmentInput: $quoteAdjustmentInput
    ) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default updateQuoteAdjustmentsMutation
