import { quoteFragment } from '../../../fragments'

const updateQuoteMutation = /* GraphQL */ `
  mutation updateQuote($quoteId: String!, $updateMode: String, $quoteInput: QuoteInput) {
    updateQuote(quoteId: $quoteId, updateMode: $updateMode, quoteInput: $quoteInput) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default updateQuoteMutation
