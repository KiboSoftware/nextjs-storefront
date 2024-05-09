/**
 * @module useUpdateCartCoupon
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCartItemByCartIDMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { CrCartItemInput } from '@/lib/gql/types'

interface UpdateCartItemByCartIDParams {
  cartId: string
  cartItemId: string
  cartItemInput: CrCartItemInput
}

const updateCartItemByCartID = async (params: UpdateCartItemByCartIDParams) => {
  const client = makeGraphQLClient()
  const { cartId, cartItemId, cartItemInput } = params

  const variables = {
    cartId,
    cartItemId,
    cartItemInput,
  }
  const response = await client.request({
    document: updateCartItemByCartIDMutation,
    variables,
  })

  return response?.updateCartItem
}

/**
 * [Mutation hook] updateCartItemByCartID uses the graphQL mutation
 *
 * <b>updateCartItem($cartId: String!, $cartItemId: String!, $cartItemInput: CrCartItemInput): CrCartItem</b>
 *
 * Description : Update Cart Item by cart id
 *
 * Parameters passed to function updateCartItemByCartID(params: UpdateCartItemByCartIDParams) => expects object of type 'UpdateCartItemByCartIDParams' containing cartId and cartItemId and cartItemInput
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.updateCartItem' which update the cart Item
 */
export const useUpdateCartItemByCartID = () => {
  const queryClient = useQueryClient()
  return {
    updateCartItemByCartID: useMutation({
      mutationFn: updateCartItemByCartID,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
