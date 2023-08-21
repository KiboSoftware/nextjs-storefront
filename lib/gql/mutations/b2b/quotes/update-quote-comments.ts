const updateQuoteCommentsMutation = /* GraphQL */ `
  mutation updateQuotesComments(
    $quoteId: String!
    $updateMode: String
    $quoteCommentInput: QuoteCommentInput
  ) {
    updateQuotesComments(
      quoteId: $quoteId
      updateMode: $updateMode
      quoteCommentInput: $quoteCommentInput
    ) {
      id
    }
  }
`

export default updateQuoteCommentsMutation
