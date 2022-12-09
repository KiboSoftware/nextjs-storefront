/**
 * @module useUpdateCartItemQuantityMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCartItemQuantityMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { CrCartItem } from '@/lib/gql/types'

interface UpdateCartItemQuantityParams {
  cartItemId: string
  quantity: number
}

const updateCartItemQuantity = async (params: UpdateCartItemQuantityParams) => {
  const client = makeGraphQLClient()
  const { cartItemId, quantity } = params

  const variables = {
    itemId: cartItemId,
    quantity,
  }
  const response = await client.request({
    document: updateCartItemQuantityMutation,
    variables,
  })

  return response?.updateCartItemQuantity
}

/**
 * [Mutation hook] useUpdateCartItemQuantityMutation uses the graphQL mutation
 *
 * <b>updateCurrentCartItemQuantity(cartItemId: String!, quantity: Int!): CartItem</b>
 *
 * Description : Updates the quantity of items currently in the cart
 *
 * Parameters passed to function updateCartItemQuantity(params: UpdateCartItemQuantityParams) => expects object of type 'UpdateCartItemQuantityParams' containing cartItemId and quantity
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.updateCartItemQuantity' which contains updated quantity for the items present in the cart
 */
export const useUpdateCartItemQuantityMutation = () => {
  const queryClient = useQueryClient()
  return {
    updateCartItemQuantity: useMutation(updateCartItemQuantity, {
      // When mutate is called:
      onMutate: async (modifiedCartItem) => {
        await queryClient.cancelQueries()

        const previousCart: any = queryClient.getQueryData(cartKeys.all)
        const cart = { ...previousCart }
        const cartItem = cart?.items?.find(
          (item: CrCartItem) => item.id === modifiedCartItem.cartItemId
        )

        if (cartItem?.id) cartItem.quantity = modifiedCartItem.quantity
        queryClient.setQueryData(cartKeys.all, cart)

        return { previousCart }
      },
      onError: (_err, _newCart, context: any) => {
        queryClient.setQueryData(cartKeys.all, context?.previousCart)
      },
      onSettled: () => {
        queryClient.invalidateQueries(cartKeys.all)
      },
    }),
  }
}
