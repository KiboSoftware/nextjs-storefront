import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'

import { ProductDataMock } from '../../../__mocks__/stories/ProductDataMock'
import { useProductDetailTemplate } from './useProductDetailTemplate'

jest.mock('@/hooks', () => ({
  useProductMutation: () => ({
    configureProduct: {
      mutateAsync: () =>
        Promise.resolve({
          configuredProduct: 'configured-product',
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

    expect(result.current.currentProduct).toStrictEqual({
      configuredProduct: 'configured-product',
      ...product,
    })
  })
})
