import { renderHook } from '@testing-library/react-hooks'

import { useProducts } from './useProducts'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useProducts', () => {
  it('should return product codes filter', async () => {
    const productCodes = [{ productCode: 'SHOE12' }]
    const { result, waitFor } = renderHook(() => useProducts(productCodes), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(productSearchResultMock)
  })
})
