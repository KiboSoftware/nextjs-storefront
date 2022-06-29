import { ProductCustomMock } from '../../../__mocks__/stories/ProductCustomMock'
import { validateProductVariations } from '../validateProductVariations'

const configuredPurchableProduct = {
  ...ProductCustomMock,
  purchasableState: {
    isPurchasable: true,
  },
  options: ProductCustomMock.options.map((each) => (each.values[0].isSelected = true)),
}

describe('[helpers] validateProductVariations function', () => {
  it('should return true if options are not present and the product is purchasable', () => {
    const product = {
      ...ProductCustomMock,
      purchasableState: {
        isPurchasable: true,
      },
      options: null,
    }
    expect(validateProductVariations(product)).toBeTruthy()
  })

  it('should return false if the product is configurable and options are not selected', () => {
    expect(validateProductVariations(ProductCustomMock)).toBeFalsy()
  })

  it('should return true if the product is configured and all options are selected', () => {
    expect(validateProductVariations(configuredPurchableProduct)).toBeTruthy()
  })
})
