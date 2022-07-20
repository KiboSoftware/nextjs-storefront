import getConfig from 'next/config'
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createWishlistMutation, createWishlistItemMutation } from '@/lib/gql/mutations'
import { buildAddToWishlistItemInput } from '@/lib/helpers/buildAddToWishlistInput'
import { wishlistKeys } from '@/lib/react-query/queryKeys'
import { WishlistProductInput } from '@/lib/types'

import { Maybe, Wishlist } from '@/lib/gql/types'

interface WishlistItemInputParams {
  product: WishlistProductInput
  customerAccountId: number
  currentWishlist: Maybe<Wishlist> | undefined
}

export interface InWishlistProductInput {
  productCode: string
  variationProductCode?: string
}

const createWishlist = async (customerAccountId: number): Promise<Wishlist> => {
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

const addToWishlist = async (props: WishlistItemInputParams) => {
  const client = makeGraphQLClient()
  const { product, customerAccountId, currentWishlist } = props
  let wishlist
  if (!currentWishlist) {
    wishlist = await createWishlist(customerAccountId)
  }

  const wishlistId = currentWishlist ? currentWishlist?.id || '' : wishlist?.id || ''
  const variables = await buildAddToWishlistItemInput(product, wishlistId)
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
        queryClient.invalidateQueries(wishlistKeys.all)
      },
    }),
  }
}
