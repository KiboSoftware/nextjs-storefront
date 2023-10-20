/**
 * @module useDeleteCurrentCart
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteCurrentCartMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

const deleteCurrentCart = async () => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: deleteCurrentCartMutation,
  })

  return response?.deleteCurrentCart
}

/**
 * [Mutation hook] useDeleteCart uses the graphQL mutation
 *
 * <b>deleteCurrentCart: Boolean</b>
 *
 * Description : Empty the cart
 *
 * Parameters passed to function deleteCurrentCart to be deleted
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.deleteCartMutation' returns 'true' if product is deleted
 */
export const useDeleteCurrentCart = () => {
  const queryClient = useQueryClient()
  return {
    deleteCurrentCart: useMutation({
      mutationFn: deleteCurrentCart,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
