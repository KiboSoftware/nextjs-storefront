import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'

import { configuredProductDataMock } from '../../../__mocks__/stories/configuredProductDataMock'
import { ProductDataMock } from '../../../__mocks__/stories/ProductDataMock'
import { useProductDetailTemplate } from './useProductDetailTemplate'

const mockConfigureProductOptionsResponse = configuredProductDataMock.configureProduct.options
jest.mock('@/hooks', () => ({
  useProductMutation: () => ({
    configureProduct: {
      mutateAsync: () =>
        Promise.resolve({
          options: mockConfigureProductOptionsResponse,
        }),
      isLoading: false,
      isSuccess: true,
    },
  }),
}))

describe('[component] Product Detail Template data: useProductDetailTemplate', () => {
  it('should return currentProduct', () => {
    const product = ProductDataMock
    const { result } = renderHook(() => useProductDetailTemplate({ product }))

    expect(result.current.currentProduct).toStrictEqual(product)
  })

  it('should run selectProductOption function successfully and return configured product details', async () => {
    const product = ProductDataMock
    const { result } = renderHook(() => useProductDetailTemplate({ product }))

    await act(async () =>
      result.current.selectProductOption(
        'test-attributeFQN',
        'test-value',
        'test-shopperEnteredValue'
      )
    )

    console.log(result.current)

    expect(result.current.currentProduct).toStrictEqual({
      ...product,
      options: [
        {
          attributeFQN: 'tenant~size',
          value: 'Small',
          shopperEnteredValue: undefined,
          isSelected: true,
          isEnabled: undefined,
        },
      ],
    })
  })
})
