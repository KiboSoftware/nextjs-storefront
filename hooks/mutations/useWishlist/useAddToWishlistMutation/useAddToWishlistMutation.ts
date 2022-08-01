import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createWishlistItemMutation } from '@/lib/gql/mutations'
import { buildAddToWishlistItemInput } from '@/lib/helpers'
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

  const variables = buildAddToWishlistItemInput(product, currentWishlist?.id as string)
  const response = await client.request({
    document: createWishlistItemMutation,
    variables,
  })
  return response?.createWishlistItem
}

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
