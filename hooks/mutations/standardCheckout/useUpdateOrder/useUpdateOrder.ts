/**
 * @module useUpdateOrder
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateOrderMutation } from '@/lib/gql/mutations'
import { cartKeys, checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrOrder, CrOrderInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UpdateOrderParams {
  orderId: string
  orderInput: CrOrderInput
}

const updateOrder = async (params: UpdateOrderParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateOrderMutation,
    variables: params,
  })

  return response?.updateOrder
}

/**
 * [Mutation hook] useUpdateOrder uses the graphQL mutation
 *
 * <b>updateOrderAction(orderId: String!, orderInput: CrOrderInput): CrOrder</b>
 *
 * Description : Update existing order
 *
 * Parameters passed to function updateOrder() => expects object of type 'CrOrder'
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result
 *
 * @returns 'response?.updateOrder' which contains Order number, payment status, product items with totals, shipping and billing details, fulfillment methods.
 */
export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return {
    updateOrder: useMutation({
      mutationFn: updateOrder,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
        queryClient.removeQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
