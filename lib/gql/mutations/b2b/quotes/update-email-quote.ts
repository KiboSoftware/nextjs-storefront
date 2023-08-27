const updateQuoteEmailMutation = /* GraphQL */ `
  mutation updateQuoteEmail($quoteId: String!, $graphQLString: [String]) {
    updateQuoteEmail(quoteId: $quoteId, graphQLString: $graphQLString)
  }
`

export default updateQuoteEmailMutation
