import { CrWishlistItem, Maybe } from '../gql/types'
import type { DeleteWishlistItemInput } from '@/lib/types'

export const buildDeleteWishlistItemParams = (
  params: DeleteWishlistItemInput
): { wishlistId: string; wishlistItemId: string } => {
  const { product, currentWishlist } = params
  const removedItem = currentWishlist?.items?.find((item: Maybe<CrWishlistItem>) => {
    if (!item?.product?.variationProductCode) {
      return item?.product?.productCode === product.productCode
    }
    return item?.product?.variationProductCode === product.variationProductCode
  })

  return {
    wishlistId: currentWishlist?.id as string,
    wishlistItemId: removedItem?.id as string,
  }
}
