import { CrOrder } from '../gql/types'

export const buildCreateOrderParams = (order: CrOrder) => ({
  orderId: order.id as string,
  orderActionInput: { actionName: 'SubmitOrder' },
})
