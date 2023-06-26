/**
 * @module useDeleteCartItem
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteCartItemMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { CrCartItem } from '@/lib/gql/types'

interface DeleteCartItemParams {
  cartItemId: string
}

const deleteCartItem = async (params: DeleteCartItemParams) => {
  const client = makeGraphQLClient()
  const { cartItemId } = params

  const variables = {
    itemId: cartItemId,
  }
  const response = await client.request({
    document: deleteCartItemMutation,
    variables,
  })

  return response?.deleteCartItemMutation
}

/**
 * [Mutation hook] useDeleteCartItem uses the graphQL mutation
 *
 * <b>deleteCurrentCartItem(cartItemId: String!): Boolean</b>
 *
 * Description : Removes the product item from the cart
 *
 * Parameters passed to function deleteCartItem(params: DeleteCartItemParams) => expects object of type DeleteCartItemParams containing cartItemId of the product to be deleted
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.deleteCartItemMutation' returns 'true' if product is deleted
 */
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient()
  return {
    deleteCartItem: useMutation({
      mutationFn: deleteCartItem,
      onMutate: async (deleteCartItem) => {
        await queryClient.cancelQueries({ queryKey: cartKeys.all })

        const previousCart: any = queryClient.getQueryData(cartKeys.all)
        const newCart = {
          ...previousCart,
          items: previousCart?.items?.filter(
            (item: CrCartItem) => item.id !== deleteCartItem.cartItemId
          ),
        }
        queryClient.setQueryData(cartKeys.all, newCart)

        return { previousCart }
      },
      onSettled: (_data, error, _, context) => {
        if (error) queryClient.setQueryData(cartKeys.all, context?.previousCart)
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
