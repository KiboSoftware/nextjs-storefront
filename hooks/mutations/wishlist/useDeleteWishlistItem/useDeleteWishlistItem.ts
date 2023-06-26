/**
 * @module useDeleteWishlistItem
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteWishlistItemMutation } from '@/lib/gql/mutations'
import { buildDeleteWishlistItemParams } from '@/lib/helpers'
import { wishlistKeys } from '@/lib/react-query/queryKeys'
import type { DeleteWishlistItemInput, WishlistHookParams } from '@/lib/types'

const deleteWishlistItem = async (props: DeleteWishlistItemInput) => {
  const client = makeGraphQLClient()
  const { product, currentWishlist } = props

  const variables = buildDeleteWishlistItemParams({ product, currentWishlist })
  const response = await client.request({
    document: deleteWishlistItemMutation,
    variables,
  })
  return response?.deleteWishlistItem
}

/**
 * [Mutation hook] useDeleteWishlistItem uses the graphql mutation
 * <b>deleteWishlistItem(wishlistId: String!, wishlistItemId: String!): Boolean</b>
 *
 * Description : Deletes item from wishlist based on wishlistId and wishlistItemId.
 *
 * Parameters passed to function deleteWishlistItem(props: DeleteWishlistItemInput) => expects params as product and currentWishlist.
 *
 * On success, calls invalidateQueries on wishlistKeys, clears timeout and fetches the updated result
 *
 * @param params Accepts a WishlistHookParams value
 *
 * @returns response?.deleteWishlistItem, which contains True/False value to identify if wishlist item has been deleted or not.
 */

export const useDeleteWishlistItem = (params?: WishlistHookParams) => {
  const queryClient = useQueryClient()
  return {
    deleteWishlistItem: useMutation({
      mutationFn: deleteWishlistItem,
      onSuccess: () => {
        const cleanTimeout = (cleanTimeoutId: any) => clearTimeout(cleanTimeoutId)

        if (params?.isRemovedFromWishlist) {
          const timeoutId = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: wishlistKeys.all })
            cleanTimeout(timeoutId)
          }, params?.delay)
        } else {
          queryClient.invalidateQueries({ queryKey: wishlistKeys.all })
        }
      },
    }),
  }
}
