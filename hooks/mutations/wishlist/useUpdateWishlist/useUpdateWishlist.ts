/**
 * @module useUpdateWishlistMutation
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateWishlistMutation, updateWishlistItemQuantityMutation } from '@/lib/gql/mutations'
import {} from '@/lib/gql/mutations'
import { buildWishlistParams } from '@/lib/helpers'
import { wishlistKeys } from '@/lib/react-query/queryKeys'
import type { WishlistProductInput } from '@/lib/types'

import type { Maybe, CrWishlist } from '@/lib/gql/types'

interface updateWishlistItemQuantityProps {
  wishlistItemId: string
  wishlistId: string
  quantity: number
}

const updateWishlist = async (props: any) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateWishlistMutation,
    variables: props,
  })
  return response
}

const updateWishlistItemQuantity = async (params: updateWishlistItemQuantityProps) => {
  console.log(updateWishlistItemQuantityMutation, params)
  try {
    const client = makeGraphQLClient()
    const response = await client.request({
      document: updateWishlistItemQuantityMutation,
      variables: params,
    })
    return response
  } catch (e) {
    console.error(e)
  }
}

/**
 * [Mutation hook] useAddToWishlistMutation uses the graphQL mutation
 *
 * <b>createWishlistItem(wishlistId: String!, wishlistItemInput: WishlistItemInput): WishlistItem</b>
 *
 * Description : Add item to wishlist for current user
 *
 * Parameters passed to function addToWishlist(props: WishlistItemInputParams) => expects object of type ' WishlistItemInputParams' containing  product ,customerAccountId ,currentWishlist
 *
 * On success, calls invalidateQueries on wishlistKeys and fetches the updated result.
 *
 * @returns 'response?.createWishlistItem', which contains wishlist items for current user
 */

export const useUpdateWishlistMutation = () => {
  const queryClient = useQueryClient()

  return {
    updateWishlist: useMutation({
      mutationFn: updateWishlist,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.all })
      },
    }),
    updateWishlistItemQuantity: useMutation({
      mutationFn: updateWishlistItemQuantity,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.all })
      },
    }),
  }
}
