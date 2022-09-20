import getConfig from 'next/config'

import { buildCreateWishlistItemInputParams } from '../buildCreateWishlistItemInputParams'

describe('[helpers] buildCreateWishlistItemInputParams function', () => {
  it('should return the buildCreateWishlistItemInputParams variables', () => {
    const { publicRuntimeConfig } = getConfig()
    const customerAccountId = 1143
    expect(buildCreateWishlistItemInputParams(customerAccountId)).toStrictEqual({
      wishlistInput: {
        customerAccountId,
        name: publicRuntimeConfig.defaultWishlistName,
      },
    })
  })
})
