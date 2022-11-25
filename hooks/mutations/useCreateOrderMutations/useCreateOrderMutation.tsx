import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createOrderMutation } from '@/lib/gql/mutations'
import { buildCreateOrderParams } from '@/lib/helpers'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Order, OrderActionInput } from '@/lib/gql/types'

export interface OrderInfo {
  orderId: string
  orderActionInput: OrderActionInput
}

const createOrder = async (checkout: Order) => {
  const orderInfo: OrderInfo = buildCreateOrderParams(checkout)

  const client = makeGraphQLClient()

  const response = await client.request({
    document: createOrderMutation,
    variables: orderInfo,
  })

  return response?.createOrderAction
}

/**
 * [ Mutation hook => createOrderAction($orderId: String!, $orderActionInput: OrderActionInput) ]
 *
 * Description : Creates a new order after clicking 'Confirm & Pay' button on Review step of checkout page
 *
 * Parameters passed to function createOrder(checkout: Order) => expects object of type 'Order'
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result
 * @returns 'response?.createOrderAction' and creates a new order with orderId
 */
export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(createOrder, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
