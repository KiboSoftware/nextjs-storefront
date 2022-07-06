import { ProductCustomMock } from '../../../__mocks__/stories/ProductCustomMock'
import { buildAddToCartInput } from '../buildAddToCartInput'

describe('[helpers] buildAddToCartInput function', () => {
  it('should return the addToCartInput variables', () => {
    const mockedProduct = ProductCustomMock
    const options = [
      {
        attributeFQN: 'test-attributeFQN',
        shopperEnteredValue: '',
        value: 'test-value',
      },
    ]
    const quantity = 2
    expect(
      buildAddToCartInput(
        {
          options,
          productCode: mockedProduct.productCode as string,
          variationProductCode: mockedProduct.variationProductCode as string,
          fulfillmentMethod: mockedProduct.fulfillmentMethod,
          purchaseLocationCode: mockedProduct.purchaseLocationCode,
        },
        quantity
      )
    ).toStrictEqual({
      product: {
        options,
        productCode: mockedProduct.productCode,
        variationProductCode: mockedProduct.variationProductCode,
      },
      quantity: 2,
      fulfillmentMethod: mockedProduct.fulfillmentMethod,
      purchaseLocation: mockedProduct.purchaseLocationCode,
    })
  })
})
