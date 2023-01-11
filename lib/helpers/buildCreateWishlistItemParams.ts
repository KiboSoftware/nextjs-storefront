import getConfig from 'next/config'

import type { CrWishlistInput } from '@/lib/gql/types'
export const buildCreateWishlistItemParams = (
  customerAccountId: number
): { wishlistInput: CrWishlistInput } => {
  const { publicRuntimeConfig } = getConfig()

  return {
    wishlistInput: {
      customerAccountId,
      name: publicRuntimeConfig.defaultWishlistName,
    },
  }
}
