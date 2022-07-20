import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteWishlistItemMutation } from '@/lib/gql/mutations'
import { wishlistKeys } from '@/lib/react-query/queryKeys'
import type { WishlistProductInput } from '@/lib/types'

import type { Maybe, Wishlist } from '@/lib/gql/types'

interface RemoveWishlistItemInputParams {
  product: WishlistProductInput
  currentWishlist: Maybe<Wishlist> | undefined
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

export const useRemoveWishlistItemMutation = () => {
  const queryClient = useQueryClient()

  return {
    removeWishlistItem: useMutation(removeWishlistItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(wishlistKeys.all)
      },
    }),
  }
}
