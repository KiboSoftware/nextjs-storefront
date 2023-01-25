import { renderHook } from '@testing-library/react-hooks'

import { useProductPriceQueries } from './useProductPriceQueries'
import { productPriceMock } from '@/__mocks__/stories/productPriceMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useProductPriceQueries', () => {
  it('should return product price', async () => {
    const { result, waitFor } = renderHook(() => useProductPriceQueries('Bot-123', true), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result?.current?.isSuccess)
    expect(result.current.data).toEqual(productPriceMock)
  })
})
