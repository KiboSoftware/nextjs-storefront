import { buildDeleteWishlistItemParams } from '../buildDeleteWishlistItemParams'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'

describe('[helpers] buildDeleteWishlistItemParams function', () => {
  it('should return the wishlist item params variables to be deleted', () => {
    const product = {
      productCode: 'MS-BTL-005',
      isPackagedStandAlone: true,
      variationProductCode: 'MS-BTL-005',
      options: [],
    }
    const currentWishlist = wishlistMock?.items[0]

    const { id: wishlistItemId } = wishlistMock?.items[0]?.items[1]
    expect(buildDeleteWishlistItemParams({ product, currentWishlist })).toStrictEqual({
      wishlistId: currentWishlist?.id,
      wishlistItemId,
    })
  })
})
