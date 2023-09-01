import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteQuote } from './useDeleteQuote'
import { createQueryClientWrapper } from '@/__test__/utils'

describe('[hooks] useDeleteQuote', () => {
  it('should delete a quote', async () => {
    const { result } = renderHook(() => useDeleteQuote({ draft: false }), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteQuote.mutate({ quoteId: 'quote-id', draft: false })

    await waitFor(() => {
      expect(result.current.deleteQuote.data).toEqual(true)
    })
  })

  it('should discard changes of a quote', async () => {
    const { result } = renderHook(() => useDeleteQuote({ draft: true }), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteQuote.mutate({ quoteId: 'quote-id', draft: true })

    await waitFor(() => {
      expect(result.current.deleteQuote.data).toEqual(true)
    })
  })
})
