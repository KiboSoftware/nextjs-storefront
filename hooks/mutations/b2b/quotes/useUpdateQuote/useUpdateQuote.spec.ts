import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateQuote } from './useUpdateQuote'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateQuote', () => {
  it('should update quote data based on name', async () => {
    const { result } = renderHook(() => useUpdateQuote(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateQuote.mutateAsync({
      quoteId: 'quote-id',
      updateMode: 'update-mode',
      name: 'name',
    })

    await waitFor(() =>
      expect(result.current.updateQuote.data).toStrictEqual(quoteMock?.items?.[0])
    )
  })
})
