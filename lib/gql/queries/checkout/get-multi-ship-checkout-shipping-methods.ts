const getCheckoutShippingMethodsQuery = /* GraphQL */ `
  query getCheckoutShippingMethods($checkoutId: String!) {
    checkoutShippingMethods(checkoutId: $checkoutId) {
      groupingId
      shippingRates {
        shippingMethodCode
        shippingMethodName
        shippingZoneCode
        isValid
        messages
        data
        currencyCode
        price
      }
    }
  }
`
export default getCheckoutShippingMethodsQuery
