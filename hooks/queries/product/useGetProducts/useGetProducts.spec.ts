import { renderHook } from '@testing-library/react-hooks'

import { useGetProducts } from './useGetProducts'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetProducts', () => {
  it('should return product codes filter', async () => {
    const productCodes = ['SHOE12']
    const { result, waitFor } = renderHook(() => useGetProducts(productCodes), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(productSearchResultMock)
  })
})
