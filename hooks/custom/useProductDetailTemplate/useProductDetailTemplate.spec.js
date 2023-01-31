import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'

import { useProductDetailTemplate } from './useProductDetailTemplate'
import { configuredProductMock } from '@/__mocks__/stories/configuredProductMock'
import { ProductCustomMock } from '@/__mocks__/stories/ProductCustomMock'

const mockConfigureProductOptionsResponse = configuredProductMock.configureProduct
jest.mock('@/hooks', () => ({
  useProductMutation: () => ({
    configureProduct: {
      mutateAsync: () =>
        Promise.resolve({
          options: mockConfigureProductOptionsResponse.options,
          variationProductCode: mockConfigureProductOptionsResponse.variationProductCode,
          productImages: mockConfigureProductOptionsResponse.productImages,
          purchasableState: mockConfigureProductOptionsResponse.purchasableState,
          inventoryInfo: mockConfigureProductOptionsResponse.inventoryInfo,
        }),
      isLoading: false,
      isSuccess: true,
    },
  }),
}))

const setup = () => {
  const product = ProductCustomMock
  const { result } = renderHook(() => useProductDetailTemplate({ product }))

  return {
    result,
    product,
  }
}

describe('[component] Product Detail Template data: useProductDetailTemplate', () => {
  it('should return currentProduct', () => {
    const { result, product } = setup()

    expect(result.current.currentProduct).toStrictEqual(product)
  })

  // it('should run selectProductOption function successfully and return configured product details', async () => {
  //   const { result, product } = setup()

  //   await act(async () =>
  //     result.current.selectProductOption(
  //       'test-attributeFQN',
  //       'test-value',
  //       'test-shopperEnteredValue'
  //     )
  //   )
/*
    expect(result.current.currentProduct).toStrictEqual({
      ...product,
      inventoryInfo: mockConfigureProductOptionsResponse.inventoryInfo,
      options: mockConfigureProductOptionsResponse.options,
      variationProductCode: mockConfigureProductOptionsResponse.variationProductCode,
      content: {
        ...product.content,
        productImages: mockConfigureProductOptionsResponse.productImages,
      },
      purchasableState: mockConfigureProductOptionsResponse.purchasableState,
      inventoryInfo: mockConfigureProductOptionsResponse.inventoryInfo,
    })
  })
*/

  it('should handle product quantity', () => {
    const { result } = setup()

    act(() => {
      result.current.setQuantity('3')
    })

    expect(result.current.quantity).toBe('3')
  })
})
