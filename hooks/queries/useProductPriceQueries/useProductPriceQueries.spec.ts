import { renderHook } from '@testing-library/react-hooks'

import { useProductPriceQueries } from './useProductPriceQueries'
import { productPriceMock } from '@/__mocks__/stories/productPriceMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useProductPriceQueries', () => {
  it('should return product search result when facet filters is selected', async () => {
    const { result, waitFor } = renderHook(() => useProductPriceQueries('Bot-123', false), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result?.current?.isSuccess)
    expect(result.current.data).toEqual(productPriceMock)
    console.log('result', result.current)
  })
})
