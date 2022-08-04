import { buildWishlistParams } from '../buildWishlistParams'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'

describe('[helpers] buildWishlistParams function', () => {
  it('should return the buildWishlistParams variables', () => {
    const currentWishlist = wishlistMock?.items[0]
    const wishlistParams = {
      productCode: 'MS-BTL-005',
      variationProductCode: 'MS-BTL-005',
      isPackagedStandAlone: true,
      options: [],
      currentWishlist: wishlistMock?.items[0],
    }

    expect(buildWishlistParams(wishlistParams)).toStrictEqual({
      product: {
        productCode: wishlistParams?.productCode,
        variationProductCode: wishlistParams?.variationProductCode,
        isPackagedStandAlone: wishlistParams?.isPackagedStandAlone,
        options: wishlistParams?.options,
      },
      currentWishlist,
    })
  })
})
