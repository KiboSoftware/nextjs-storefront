import getConfig from 'next/config'

import { buildCreateWishlistItemInput } from '../buildCreateWishlistItemInput'

describe('[helpers] buildCreateWishlistItemInput function', () => {
  it('should return the buildCreateWishlistItemInput variables', () => {
    const { publicRuntimeConfig } = getConfig()
    const customerAccountId = 1143
    expect(buildCreateWishlistItemInput(customerAccountId)).toStrictEqual({
      wishlistInput: {
        customerAccountId,
        name: publicRuntimeConfig.defaultWishlistName,
      },
    })
  })
})
