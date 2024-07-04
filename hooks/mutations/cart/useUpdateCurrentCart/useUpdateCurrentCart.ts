/**
 * @module useUpdateCurrentCart
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCurrentCartMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { CrCartInput } from '@/lib/gql/types'

interface UpdateCurrentCartParams {
  cartInput: CrCartInput
}

const updateCurrentCart = async (params: UpdateCurrentCartParams) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: updateCurrentCartMutation,
    variables: params,
  })

  return response?.updateCurrentCart
}

/**
 * [Mutation hook] updateCurrentCart uses the graphQL mutation
 *
 * <b>updateCurrentCart(cartInput: CrCartInput): CrCart</b>
 *
 * Description : Update Current Cart
 *
 * Parameters passed to function updateCurrentCart(params: UpdateCurrentCartParams) => expects object of type 'UpdateCurrentCartParams' containing cartInput
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.updateCurrentCart' which update the current cart
 */
export const useUpdateCurrentCart = () => {
  const queryClient = useQueryClient()
  return {
    updateCurrentCart: useMutation({
      mutationFn: updateCurrentCart,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
