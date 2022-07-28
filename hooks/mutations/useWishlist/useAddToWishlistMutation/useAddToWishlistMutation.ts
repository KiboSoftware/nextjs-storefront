import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createWishlistMutation, createWishlistItemMutation } from '@/lib/gql/mutations'
import { buildAddToWishlistItemInput, buildCreateWishlistItemInput } from '@/lib/helpers'
import { wishlistKeys } from '@/lib/react-query/queryKeys'
import type { WishlistProductInput } from '@/lib/types'

import type { Maybe, Wishlist } from '@/lib/gql/types'

interface WishlistItemInputParams {
  product: WishlistProductInput
  customerAccountId: number
  currentWishlist?: Maybe<Wishlist>
}

export interface InWishlistProductInput {
  productCode: string
  variationProductCode?: string
}

const createWishlist = async (customerAccountId: number) => {
  const client = makeGraphQLClient()

  const variables = buildCreateWishlistItemInput(customerAccountId)
  const response = await client.request({
    document: createWishlistMutation,
    variables,
  })

  return response?.createWishlist
}

const addToWishlist = async (props: WishlistItemInputParams) => {
  const client = makeGraphQLClient()
  const { product, customerAccountId, currentWishlist } = props
  let wishlist
  if (!currentWishlist) {
    wishlist = await createWishlist(customerAccountId)
  }

  const wishlistId = currentWishlist ? currentWishlist?.id || '' : wishlist?.id || ''
  const variables = buildAddToWishlistItemInput(product, wishlistId)
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
