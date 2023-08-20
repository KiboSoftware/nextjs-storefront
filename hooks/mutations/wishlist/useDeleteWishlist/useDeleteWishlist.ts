/**
 * @module useDeleteWishlist
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteWishlistMutation } from '@/lib/gql/mutations'
import { wishlistKeys } from '@/lib/react-query/queryKeys'

interface DeleteWishlistData {
  deleteWishlist: boolean
}

const deleteWishlist = async (wishlistId: string): Promise<DeleteWishlistData> => {
  const client = makeGraphQLClient()
  const variables = {
    wishlistId,
  }

  const response = await client.request({
    document: deleteWishlistMutation,
    variables,
  })

  return response
}

/**
 * [Mutation hook] useDeleteWishlistMutation uses the graphQL mutation
 *
 * <b>deleteWishlist(wishlistId: string): Wishlist</b>
 *
 * Description : Deletes the wishlist
 *
 * Parameters passed to function deleteWishlist(wishlistId: string) => expects to delete the wishlist
 *
 * @returns true if wishlist deleted
 */

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient()

  return {
    deleteWishlist: useMutation({
      mutationFn: (wishlistId: string) => deleteWishlist(wishlistId),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: wishlistKeys.all }),
    }),
  }
}
