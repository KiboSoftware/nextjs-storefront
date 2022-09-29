import getConfig from 'next/config'

import type { WishlistInput } from '@/lib/gql/types'
export const buildCreateWishlistItemParams = (
  customerAccountId: number
): { wishlistInput: WishlistInput } => {
  const { publicRuntimeConfig } = getConfig()

  return {
    wishlistInput: {
      customerAccountId,
      name: publicRuntimeConfig.defaultWishlistName,
    },
  }
}
