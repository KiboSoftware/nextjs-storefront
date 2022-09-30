import { buildRemoveWishlistItemParams } from '../buildRemoveWishlistItemParams'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'

describe('[helpers] buildRemoveWishlistItemParams function', () => {
  it('should return the buildRemoveWishlistItemParams variables', () => {
    const product = {
      productCode: 'MS-BTL-005',
      isPackagedStandAlone: true,
      variationProductCode: 'MS-BTL-005',
      options: [],
    }
    const currentWishlist = wishlistMock?.items[0]

    const { id: wishlistItemId } = wishlistMock?.items[0]?.items[1]
    expect(buildRemoveWishlistItemParams({ product, currentWishlist })).toStrictEqual({
      wishlistId: currentWishlist?.id,
      wishlistItemId,
    })
  })
})
