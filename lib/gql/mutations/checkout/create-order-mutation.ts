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
      email
      id
      userId
    }
  }
`

export default createOrderMutation
