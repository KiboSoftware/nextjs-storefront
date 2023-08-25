import { renderHook, waitFor } from '@testing-library/react'

import { useEmailQuote } from './useEmailQuote'
import { createQueryClientWrapper } from '@/__test__/utils'

describe('[hooks] useEmailQuote', () => {
  it('should delete a quote', async () => {
    const { result } = renderHook(() => useEmailQuote(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.emailQuote.mutate({
      emails: ['test@gmail.com'],
      quoteId: 'quote-id',
    })

    await waitFor(() => {
      expect(result.current.emailQuote.data).toEqual(true)
    })
  })
})
