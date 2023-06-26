/**
 * @module useUpdateCartItemQuantity
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCartItemQuantityMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { CrCartItem, Maybe } from '@/lib/gql/types'

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
 * [Mutation hook] useUpdateCartItemQuantity uses the graphQL mutation
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
export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient()
  return {
    updateCartItemQuantity: useMutation({
      mutationFn: updateCartItemQuantity,
      // When mutate is called:
      onMutate: async (modifiedCartItem: any) => {
        await queryClient.cancelQueries({ queryKey: cartKeys.all })

        const previousCart = queryClient.getQueryData(cartKeys.all)

        // Create an optimistic update by updating the cart in the cache immediately
        queryClient.setQueryData(cartKeys.all, (oldCart: any) => {
          const newCart = {
            ...oldCart,
            items: oldCart?.items?.map((item: Maybe<CrCartItem>) => {
              if (item?.id === modifiedCartItem?.cartItemId) {
                return {
                  ...item,
                  quantity: modifiedCartItem.quantity,
                }
              }
              return item
            }),
          }
          return newCart
        })

        // Return a context object with the previous cart data to use in the onSettled callback
        return { previousCart }
      },
      onSettled: (_data, error, _, context) => {
        if (error) queryClient.setQueryData(cartKeys.all, context?.previousCart)
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
