const deleteQuoteMutation = /* GraphQL */ `
  mutation deleteQuote($quoteId: String!, $draft: Boolean) {
    deleteQuote(quoteId: $quoteId, draft: $draft)
  }
`

export default deleteQuoteMutation
