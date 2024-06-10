/**
 * @module useUpdateOrder
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateOrderDataMutation } from '@/lib/gql/mutations'
import { cartKeys, checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrOrder, CrOrderInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UpdateOrderDataParams {
  orderId: string
  orderDataId: string
  undefinedInput: any
}

const updateOrderData = async (params: UpdateOrderDataParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateOrderDataMutation,
    variables: params,
  })

  return response?.updateOrderData
}

/**
 * [Mutation hook] useUpdateOrderData uses the graphQL mutation
 *
 * <b>updateOrderData(orderId: String!, orderDataId: String! undefinedInput: Object): Object</b>
 *
 * Description : Update existing order custom data
 *
 * Parameters passed to function updateOrderData() => expects object of type 'Object'
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result
 *
 * @returns 'response?.updateOrderData' which contains updated order data details
 */
export const useUpdateOrderData = () => {
  const queryClient = useQueryClient()

  return {
    updateOrderData: useMutation({
      mutationFn: updateOrderData,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
        queryClient.removeQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
