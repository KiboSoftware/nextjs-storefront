import { ProductDataMock } from '../../../__mocks__/stories/ProductDataMock'
import { validateProductVariations } from '../validateProductVariations'

const configuredPurchableProduct = {
  ...ProductDataMock,
  purchasableState: {
    isPurchasable: true,
  },
  options: ProductDataMock.options.map((each) => (each.values[0].isSelected = true)),
}

describe('[helpers] validateProductVariations function', () => {
  it('should return true if options are not present and the product is purchasable', () => {
    const product = {
      ...ProductDataMock,
      purchasableState: {
        isPurchasable: true,
      },
      options: null,
    }
    expect(validateProductVariations(product)).toBeTruthy()
  })

  it('should return false if the product is configurable and options are not selected', () => {
    expect(validateProductVariations(ProductDataMock)).toBeFalsy()
  })

  it('should return true if the product is configured and all options are selected', () => {
    expect(validateProductVariations(configuredPurchableProduct)).toBeTruthy()
  })
})
