const getQuoteShippingMethodsQuery = /* GraphQL */ `
  query getQuoteShippingMethods($quoteId: String!, $draft: Boolean) {
    getQuoteShippingMethods(quoteId: $quoteId, draft: $draft) {
      shippingMethodName
      shippingMethodCode
      price
      shippingZoneCode
      isValid
      messages
      data
      currencyCode
      price
    }
  }
`
export default getQuoteShippingMethodsQuery
