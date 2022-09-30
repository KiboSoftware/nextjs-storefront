import type { WishlistProductInput } from '@/lib/types'

import type { MutationCreateWishlistItemArgs } from '@/lib/gql/types'

export const buildAddToWishlistItemParams = (
  product: WishlistProductInput,
  wishlistId: string
): MutationCreateWishlistItemArgs => {
  return {
    wishlistId: wishlistId,
    wishlistItemInput: {
      product: {
        options: product?.options?.map((option) => {
          return {
            attributeFQN: option?.attributeFQN,
            value: option?.value || option?.shopperEnteredValue,
          }
        }),
        productCode: product?.productCode || '',
        variationProductCode: product?.variationProductCode || '',
        isPackagedStandAlone: product?.isPackagedStandAlone || true,
      },
      quantity: 1,
    },
  }
}
