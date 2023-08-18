const deleteQuoteItemMutation = /* GraphQL */ `
  mutation deleteQuoteItem($quoteId: String!, $quoteItemId: String!, $updateMode: String) {
    deleteQuoteItem(quoteId: $quoteId, quoteItemId: $quoteItemId, updateMode: $updateMode)
  }
`

export default deleteQuoteItemMutation
