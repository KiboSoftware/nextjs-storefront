const updateOrderDataMutation = /* GraphQL */ `
  mutation updateOrderData($orderId: String!, $orderDataId: String!, $undefinedInput: Object) {
    updateOrderData(orderId: $orderId, orderDataId: $orderDataId, undefinedInput: $undefinedInput)
  }
`
export default updateOrderDataMutation
