import type { WishlistProductInput } from '@/lib/types'

import type { MutationCreateWishlistItemArgs } from '@/lib/gql/types'

export const buildAddToWishlistItemInput = (
  product: WishlistProductInput,
  wishlistId: string
): MutationCreateWishlistItemArgs => {
  return {
    wishlistId: wishlistId,
    wishlistItemInput: {
      product: {
        options: product?.options?.map((productOption) => ({
          attributeFQN: productOption?.attributeFQN,
          name: productOption?.attributeDetail?.name,
          value: productOption?.values?.find((value) => value?.isSelected)?.value,
        })),
        productCode: product?.productCode || '',
        variationProductCode: product?.variationProductCode || '',
        isPackagedStandAlone: product?.isPackagedStandAlone || true,
      },
      quantity: 1,
    },
  }
}
