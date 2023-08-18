import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteQuote } from './useDeleteQuote'
import { createQueryClientWrapper } from '@/__test__/utils'

describe('[hooks] useDeleteQuote', () => {
  it('should use useDeleteQuoteItem when deleteCartItem', async () => {
    const { result } = renderHook(() => useDeleteQuote(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteQuote.mutate('quote-id')

    await waitFor(() => {
      expect(result.current.deleteQuote.data).toEqual(true)
    })
  })
})
