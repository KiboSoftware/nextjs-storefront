/**
 * @module useUpdateUserOrder
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateUserOrder } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

const updateUserId = async (orderId: string) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateUserOrder,
    variables: {
      orderId,
    },
  })

  return response?.checkout
}

/**
 * [Mutation hook] useUpdateUserOrder uses the graphQL mutation
 *
 * <b>useUpdateUserOrder(orderId: String!): CrOrder</b>
 *
 * Description : Updates current order in checkout
 *
 * Parameters passed to function useUpdateUserOrder(orderId: string) => expects orderId as string type
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.checkout', which contains updated shipping checkout information
 */

export const useUpdateUserOrder = () => {
  const queryClient = useQueryClient()

  return {
    updateUserOrder: useMutation({
      mutationFn: updateUserId,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
