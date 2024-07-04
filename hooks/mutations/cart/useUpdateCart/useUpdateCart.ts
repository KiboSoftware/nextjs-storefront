/**
 * @module useUpdateCart
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCartMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { CrCartInput } from '@/lib/gql/types'

interface UpdateCartParams {
  cartId: string
  cartInput: CrCartInput
}

const updateCart = async (params: UpdateCartParams) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: updateCartMutation,
    variables: params,
  })

  return response?.updateCart
}

/**
 * [Mutation hook] updateCart uses the graphQL mutation
 *
 * <b>updateCart(cartId: String!,cartInput: CrCartInput): CrCart</b>
 *
 * Description : Update  Cart
 *
 * Parameters passed to function updateCart(params: UpdateCartParams) => expects object of type 'UpdateCartParams' containing cartInput and cartId
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.updateCart' which update the cart
 */
export const useUpdateCart = () => {
  const queryClient = useQueryClient()
  return {
    updateCart: useMutation({
      mutationFn: updateCart,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
