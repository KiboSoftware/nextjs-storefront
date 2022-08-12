import { Order } from '../gql/types'

export const buildCreateOrderParams = (order: Order) => ({
  orderId: order.id as string,
  orderActionInput: { actionName: 'SubmitOrder' },
})
