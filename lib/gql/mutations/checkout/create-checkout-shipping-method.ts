const createCheckoutShippingMethod = /* GraphQL */ `
  mutation createCheckoutShippingMethod(
    $checkoutId: String!
    $checkoutGroupShippingMethodInput: [CheckoutGroupShippingMethodInput]
  ) {
    checkout: createCheckoutShippingMethod(
      checkoutId: $checkoutId
      checkoutGroupShippingMethodInput: $checkoutGroupShippingMethodInput
    ) {
      id
    }
  }
`
export default createCheckoutShippingMethod
