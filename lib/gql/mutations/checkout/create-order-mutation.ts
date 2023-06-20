const createOrderMutation = /* GraphQL */ `
  mutation createOrderAction($orderId: String!, $orderActionInput: OrderActionInput) {
    createOrderAction(orderId: $orderId, orderActionInput: $orderActionInput) {
      orderNumber
      parentOrderId
      parentOrderNumber
      paymentStatus
      submittedDate
      total
      status
    }
  }
`

export default createOrderMutation
