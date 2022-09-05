import { buildAddOrRemoveWishlistItem } from '../buildAddOrRemoveWishlistItem'
import { ProductCustomMock } from '@/__mocks__/stories'

describe('[helpers] buildAddOrRemoveWishlistItem function', () => {
  it('should return the addOrRemoveWishlistItem variables', () => {
    const mockedProduct = ProductCustomMock
    expect(buildAddOrRemoveWishlistItem(mockedProduct)).toStrictEqual({
      productCode: mockedProduct.productCode,
      variationProductCode: mockedProduct.variationProductCode,
      isPackagedStandAlone: true,
      options:
        mockedProduct?.options?.map((productOption) => ({
          attributeFQN: productOption?.attributeFQN,
          name: productOption?.attributeDetail?.name,
          value: productOption?.values?.find((v) => v?.isSelected)?.value,
        })) || [],
    })
  })
})
