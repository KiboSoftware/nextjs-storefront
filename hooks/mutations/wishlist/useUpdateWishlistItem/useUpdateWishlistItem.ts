/**
 * @module useUpdateWishlistItemMutation
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateWishlistMutation, updateWishlistItemQuantityMutation } from '@/lib/gql/mutations'
import { customerWishlistKeys, wishlistKeys } from '@/lib/react-query/queryKeys'
import { WishlistHookParams } from '@/lib/types'

import { CrWishlist, CrWishlistInput, CrWishlistItem } from '@/lib/gql/types'

interface UpdateWishlistProps {
  wishlistId: string
  wishlistInput: CrWishlistInput
}

interface UpdateWishlistItemQuantityProps {
  wishlistItemId: string
  wishlistId: string
  quantity: number
}

interface UpdateWishlistData {
  updateWishlist: CrWishlist
}

interface UpdateWishlistItemData {
  updateWishlistItemQuantity: CrWishlistItem
}

const updateWishlist = async (props: UpdateWishlistProps): Promise<UpdateWishlistData> => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateWishlistMutation,
    variables: props,
  })
  return response
}

const updateWishlistItemQuantity = async (
  params: UpdateWishlistItemQuantityProps
): Promise<UpdateWishlistItemData> => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: updateWishlistItemQuantityMutation,
    variables: params,
  })
  return response
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

export const useUpdateWishlistItemMutation = (params?: WishlistHookParams) => {
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
        if (params?.isCreateList) {
          queryClient.invalidateQueries({ queryKey: customerWishlistKeys.all })
        }
      },
    }),
  }
}
