/**
 * @module useCreateWishlistMutation
 */
import getConfig from 'next/config'
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createWishlistMutation } from '@/lib/gql/mutations'
import { wishlistKeys } from '@/lib/react-query/queryKeys'

const createWishlist = async (customerAccountId: number) => {
  const client = makeGraphQLClient()

  const { publicRuntimeConfig } = getConfig()

  const variables = {
    wishlistInput: {
      customerAccountId,
      name: publicRuntimeConfig.defaultWishlistName,
    },
  }
  const response = await client.request({
    document: createWishlistMutation,
    variables,
  })

  return response?.createWishlist
}

/**
 * [Mutation hook] useCreateWishlistMutation uses the graphQL mutation
 *
 * <b>createWishlist(wishlistInput: WishlistInput): Wishlist</b>
 *
 * Description : Creates the wishlist for logged in user
 *
 * Parameters passed to function createWishlist(customerAccountId: number) => expects object containing accountId to create wishlist.
 *
 * On success, calls invalidateQueries on wishlistKeys and fetches the updated result.
 *
 * @returns 'response?.createWishlistItem', which contains wishlist created for user.
 */

export const useCreateWishlistMutation = () => {
  const queryClient = useQueryClient()

  return {
    createWishlist: useMutation(createWishlist, {
      onSuccess: () => {
        queryClient.invalidateQueries(wishlistKeys.all)
      },
    }),
  }
}
