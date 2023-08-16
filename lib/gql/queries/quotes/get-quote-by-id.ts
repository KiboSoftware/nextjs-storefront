import { quoteFragment } from '../../fragments'

const getQuoteByIDQuery = /* GraphQL */ `
  query getQuoteByID($quoteId: String!, $draft: Boolean) {
    quote(quoteId: $quoteId, draft: $draft) {
      ...quoteFragment
    }
  }
  ${quoteFragment}
`
export default getQuoteByIDQuery
