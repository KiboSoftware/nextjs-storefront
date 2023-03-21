import { renderHook } from '@testing-library/react-hooks'

import { useGetProductPrice } from './useGetProductPrice'
import { productPriceMock } from '@/__mocks__/stories/productPriceMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetProductPrice', () => {
  it('should return product price', async () => {
    const { result, waitFor } = renderHook(() => useGetProductPrice('Bot-123', true), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result?.current?.isSuccess)
    expect(result.current.data).toEqual(productPriceMock)
  })
})
