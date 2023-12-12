import type { WishlistProductInput } from '@/lib/types'

import type { MutationCreateWishlistItemArgs } from '@/lib/gql/types'

export const buildAddToWishlistItemParams = (
  product: WishlistProductInput,
  wishlistId: string,
  quantity?: number
): MutationCreateWishlistItemArgs => {
  return {
    wishlistId: wishlistId,
    wishlistItemInput: {
      quantity: quantity ? quantity : 1,
      product: {
        options: product?.options?.map((option: any) => {
          return {
            name: option?.attributeDetail?.name,
            value: option?.value,
            attributeFQN: option?.attributeFQN,
          }
        }),
        productCode: product?.productCode,
        variationProductCode: product?.variationProductCode,
        isPackagedStandAlone: product?.isPackagedStandAlone || false,
      },
    },
  }
}
