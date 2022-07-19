import getConfig from 'next/config'
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import {
  createWishlistMutation,
  createWishlistItemMutation,
  deleteWishlistItemMutation,
} from '@/lib/gql/mutations'
import { buildAddToWishlistItemInput } from '@/lib/helpers/buildAddToWishlistInput'
import { wishlistKeys } from '@/lib/react-query/queryKeys'

import { Maybe, ProductOption, Wishlist } from '@/lib/gql/types'

export interface WishlistProductInput {
  options: ProductOption[]
  productCode: string
  isPackagedStandAlone: boolean
  variationProductCode?: string
}

interface WishlistItemInputParams {
  product: WishlistProductInput
  customerAccountId: number
  currentWishlist: Maybe<Wishlist> | undefined
}

interface RemoveWishlistItemInputParams {
  product: WishlistProductInput
  currentWishlist: Maybe<Wishlist> | undefined
}

export interface InWishlistProductInput {
  productCode: string
  variationProductCode?: string
}

interface InWishlistItemInputParams {
  product: InWishlistProductInput
  currentWishlist: Maybe<Wishlist> | undefined
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

const removeWishlistItem = async (props: RemoveWishlistItemInputParams) => {
  const client = makeGraphQLClient()
  const { product, currentWishlist } = props

  const removedItem = currentWishlist?.items?.find((item) => {
    if (!item?.product?.variationProductCode) {
      return item?.product?.productCode === product.productCode
    }
    return item?.product?.variationProductCode === product.variationProductCode
  })

  const variables = {
    wishlistId: currentWishlist?.id,
    wishlistItemId: removedItem?.id,
  }
  const response = await client.request({
    document: deleteWishlistItemMutation,
    variables,
  })
  return response?.deleteWishlistItem
}

export const useWishlistMutation = () => {
  const queryClient = useQueryClient()

  return {
    addToWishlist: useMutation(addToWishlist, {
      onSuccess: () => {
        queryClient.invalidateQueries(wishlistKeys.all)
      },
    }),
    removeWishlistItem: useMutation(removeWishlistItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(wishlistKeys.all)
      },
    }),
  }
}
