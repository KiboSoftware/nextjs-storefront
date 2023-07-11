/**
 * @module useCreateOrder
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createOrderMutation } from '@/lib/gql/mutations'
import { buildCreateOrderParams } from '@/lib/helpers'
import { cartKeys, checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrOrder, OrderActionInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface OrderInfo {
  orderId: string
  orderActionInput: OrderActionInput
}

const createOrder = async (checkout: CrOrder) => {
  const orderInfo: OrderInfo = buildCreateOrderParams(checkout)

  const client = makeGraphQLClient()

  const response = await client.request({
    document: createOrderMutation,
    variables: orderInfo,
  })

  return response?.createOrderAction
}

/**
 * [Mutation hook] useCreateOrder uses the graphQL mutation
 *
 * <b>createOrderAction(orderId: String!, orderActionInput: OrderActionInput): Order</b>
 *
 * Description : Creates a new order after clicking 'Confirm & Pay' button on Review step of checkout page
 *
 * Parameters passed to function createOrder(checkout: Order) => expects object of type 'Order'
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result
 *
 * @returns 'response?.createOrderAction' which contains Order number, payment status, product items with totals, shipping and billing details, fulfillment methods.
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return {
    createOrder: useMutation({
      mutationFn: createOrder,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
        queryClient.removeQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
