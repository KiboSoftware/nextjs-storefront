/**
 * @module useDeleteWishlistItemById
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteWishlistItemMutation } from '@/lib/gql/mutations'
import { customerWishlistKeys, wishlistKeys } from '@/lib/react-query/queryKeys'
import type { WishlistHookParams } from '@/lib/types'

const deleteWishlistItemById = async (props: { wishlistId: string; wishlistItemId: string }) => {
  const client = makeGraphQLClient()

  const variables = props
  const response = await client.request({
    document: deleteWishlistItemMutation,
    variables,
  })
  return response?.deleteWishlistItem
}

/**
 * [Mutation hook] useDeleteWishlistItemId uses the graphql mutation
 * <b>deleteWishlistItemById(wishlistId: String!, wishlistItemId: String!): Boolean</b>
 *
 * Description : Deletes item from wishlist based on wishlistId and wishlistItemId.
 *
 * Parameters passed to function deleteWishlistItemById(props: DeleteWishlistItemInput) => expects params as wishlistId and wishlistItemId.
 *
 * On success, calls invalidateQueries on wishlistKeys, clears timeout and fetches the updated result
 *
 * @param params Accepts a WishlistHookParams value
 *
 * @returns response?.deleteWishlistItemById, which contains True/False value to identify if wishlist item has been deleted or not.
 */

export const useDeleteWishlistItemById = (params?: WishlistHookParams) => {
  const queryClient = useQueryClient()
  return {
    deleteWishlistItemById: useMutation({
      mutationFn: deleteWishlistItemById,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.all })

        if (params?.isCreateList) {
          queryClient.invalidateQueries({ queryKey: customerWishlistKeys.all })
        }
      },
    }),
  }
}
