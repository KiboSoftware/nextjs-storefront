import getConfig from 'next/config'

import { buildCreateWishlistItemParams } from '../buildCreateWishlistItemParams'

describe('[helpers] buildCreateWishlistItemParams function', () => {
  it('should return the buildCreateWishlistItemParams variables', () => {
    const { publicRuntimeConfig } = getConfig()
    const customerAccountId = 1143
    expect(buildCreateWishlistItemParams(customerAccountId)).toStrictEqual({
      wishlistInput: {
        customerAccountId,
        name: publicRuntimeConfig.defaultWishlistName,
      },
    })
  })
})
