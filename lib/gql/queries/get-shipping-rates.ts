const getShippingRatesQuery = /* GraphQL */ `
  query getShippingRates($checkoutId: String!) {
    orderShipmentMethods(orderId: $checkoutId) {
      shippingMethodCode
      shippingMethodName
      shippingZoneCode
      isValid
      messages
      data
      currencyCode
      price
      fulfillmentMethod
    }
  }
`
export default getShippingRatesQuery
