import { renderHook } from '@testing-library/react-hooks'

import { useProductsQueries } from './useProductsQueries'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useProductsQueries', () => {
  it('should return product codes filter', async () => {
    const productCodes = ['SHOE12']
    const { result, waitFor } = renderHook(() => useProductsQueries(productCodes), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(productSearchResultMock)
  })
})
