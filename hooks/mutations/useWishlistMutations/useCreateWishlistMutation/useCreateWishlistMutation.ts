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
 * [ Mutation hook => createWishlist(wishlistInput: $wishlistInput)]
 *
 * Description : It creates wishlist for user
 *
 * Parameters passed to function createWishlist(customerAccountId: number) => customerAccountId in params
 *
 * On success, calls invalidateQueries on wishlistKeys
 * @returns 'response?.createWishlistItem' containing wishlist created for user
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
