import { renderHook, waitFor } from '@testing-library/react'

import { useGetQuoteByID } from './useGetQuoteById'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetQuoteByID', () => {
  it('should return quote data based on id', async () => {
    const { result } = renderHook(() => useGetQuoteByID({ quoteId: 'quote-id', draft: true }), {
      wrapper: createQueryClientWrapper(),
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result.current.data).toStrictEqual(quoteMock?.items?.[0]))
  })
})
