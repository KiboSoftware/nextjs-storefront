/**
 * @module useCreateWishlist
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import getConfig from 'next/config'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createWishlistMutation } from '@/lib/gql/mutations'
import { wishlistKeys } from '@/lib/react-query/queryKeys'

import { CrWishlist, CrWishlistInput } from '@/lib/gql/types'

const createWishlist = async (data: number | CrWishlistInput): Promise<CrWishlist> => {
  const client = makeGraphQLClient()

  const { publicRuntimeConfig } = getConfig()
  debugger
  const variables =
    typeof data === 'number'
      ? {
          wishlistInput: {
            customerAccountId: data,
            name: publicRuntimeConfig.defaultWishlistName,
          },
        }
      : {
          wishlistInput: {
            customerAccountId: data.customerAccountId,
            name: data.name,
            items: data.items,
          },
        }
  const response = await client.request({
    document: createWishlistMutation,
    variables,
  })

  return response?.createWishlist
}

/**
 * [Mutation hook] useCreateWishlist uses the graphQL mutation
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

export const useCreateWishlist = () => {
  const queryClient = useQueryClient()
  return {
    createWishlist: useMutation({
      mutationFn: createWishlist,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.all })
      },
    }),
  }
}
