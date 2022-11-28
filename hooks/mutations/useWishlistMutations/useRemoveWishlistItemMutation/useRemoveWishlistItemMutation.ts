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
 * [ Mutation hook => createWishlist(wishlistInput: $wishlistInput)]
 *
 * Description : It deleted item from wishlist
 * On success, calls invalidateQueries on wishlistKeys and clears timeout
 * @param params  WishlistHookParams
 * @returns function removeWishlistItem which calls remove wishlist mutation it accepts props (props: RemoveWishlistItemInput) in params and deletes item from wishlist
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
