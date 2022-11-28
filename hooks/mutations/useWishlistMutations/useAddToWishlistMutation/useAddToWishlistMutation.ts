import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createWishlistItemMutation } from '@/lib/gql/mutations'
import { buildAddToWishlistItemParams } from '@/lib/helpers'
import { wishlistKeys } from '@/lib/react-query/queryKeys'
import type { WishlistProductInput } from '@/lib/types'

import type { Maybe, Wishlist } from '@/lib/gql/types'

interface WishlistItemInputParams {
  product: WishlistProductInput
  customerAccountId: number
  currentWishlist?: Maybe<Wishlist>
}

const addToWishlist = async (props: WishlistItemInputParams) => {
  const client = makeGraphQLClient()
  const { product, currentWishlist } = props

  const variables = buildAddToWishlistItemParams(product, currentWishlist?.id as string)
  const response = await client.request({
    document: createWishlistItemMutation,
    variables,
  })
  return response?.createWishlistItem
}

/**
 * [ Mutation hook => createWishlistItem(wishlistId: $wishlistId, wishlistItemInput: $wishlistItemInput)]
 *
 * Description : It add item to wishlist for current user
 *
 * Parameters passed to function addToWishlist(props: WishlistItemInputParams) => expects object of type ' WishlistItemInputParams' containing  product: WishlistProductInput,customerAccountId: number,currentWishlist?: Maybe<Wishlist>
 *
 * On success, calls invalidateQueries on wishlistKeys
 * @returns 'response?.createWishlistItem' containing wishlist items for current user
 */
export const useAddToWishlistMutation = () => {
  const queryClient = useQueryClient()

  return {
    addToWishlist: useMutation(addToWishlist, {
      onSuccess: () => {
        queryClient.removeQueries(wishlistKeys.all)
      },
    }),
  }
}
