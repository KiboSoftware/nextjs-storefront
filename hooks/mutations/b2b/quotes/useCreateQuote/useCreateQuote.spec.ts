import { renderHook, waitFor } from '@testing-library/react'

import { useCreateQuote } from './useCreateQuote'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateQuote', () => {
  it('should create quote based on customerAccountId', async () => {
    const { result } = renderHook(() => useCreateQuote(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createQuote.mutateAsync({
      customerAccountId: 123,
    })

    await waitFor(() =>
      expect(result.current.createQuote.data).toStrictEqual(quoteMock?.items?.[0])
    )
  })
})
