import { quoteFragment } from '../../../fragments'

const createQuoteMutation = /* GraphQL */ `
  mutation createQuote($quoteInput: QuoteInput) {
    createQuote(quoteInput: $quoteInput) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`

export default createQuoteMutation
