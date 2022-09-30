import { buildAddToWishlistItemParams } from '../buildAddToWishlistParams'

describe('[helpers] buildAddToWishlistInput function', () => {
  it('should return the buildAddToWishlistItemParams variables', () => {
    const product = {
      productCode: 'MS-BTL-005',
      isPackagedStandAlone: true,
      variationProductCode: 'MS-BTL-005',
      options: [],
    }
    const wishlistId = '13cc2e5236615b000102f572000045a4'

    expect(buildAddToWishlistItemParams(product, wishlistId)).toStrictEqual({
      wishlistId,
      wishlistItemInput: {
        product,
        quantity: 1,
      },
    })
  })
})
