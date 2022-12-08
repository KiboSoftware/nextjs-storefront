/**
 * @module useRemoveWishlistItemMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteWishlistItemMutation } from '@/lib/gql/mutations'
import { buildRemoveWishlistItemParams } from '@/lib/helpers'
import { wishlistKeys } from '@/lib/react-query/queryKeys'
import type { RemoveWishlistItemInput, WishlistHookParams } from '@/lib/types'

const removeWishlistItem = async (props: RemoveWishlistItemInput) => {
  const client = makeGraphQLClient()
  const { product, currentWishlist } = props

  const variables = buildRemoveWishlistItemParams({ product, currentWishlist })
  const response = await client.request({
    document: deleteWishlistItemMutation,
    variables,
  })
  return response?.deleteWishlistItem
}

/**
 * [Mutation hook] useRemoveCartItemMutation uses the graphql mutation
 * <b>deleteWishlistItem(wishlistId: String!, wishlistItemId: String!): Boolean</b>
 *
 * Description : Deletes item from wishlist based on wishlistId and wishlistItemId.
 *
 * Parameters passed to function removeWishlistItem(props: RemoveWishlistItemInput) => expects params as product and currentWishlist.
 *
 * On success, calls invalidateQueries on wishlistKeys, clears timeout and fetches the updated result
 *
 * @param params Accepts a WishlistHookParams value
 *
 * @returns response?.deleteWishlistItem, which contains True/False value to identify if wishlist item has been deleted or not.
 */

export const useRemoveWishlistItemMutation = (params?: WishlistHookParams) => {
  const queryClient = useQueryClient()
  return {
    removeWishlistItem: useMutation(removeWishlistItem, {
      onSuccess: () => {
        const cleanTimeout = (cleanTimeoutId: any) => clearTimeout(cleanTimeoutId)

        if (params?.isRemovedFromWishlist) {
          const timeoutId = setTimeout(() => {
            queryClient.invalidateQueries(wishlistKeys.all)
            cleanTimeout(timeoutId)
          }, params?.delay)
        } else {
          queryClient.invalidateQueries(wishlistKeys.all)
        }
      },
    }),
  }
}
