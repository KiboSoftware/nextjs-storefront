import { renderHook, waitFor } from '@testing-library/react'

import { useAddQuoteComment } from './useAddQuoteComment'
import { createQueryClientWrapper } from '@/__test__/utils'

describe('[hooks] useAddQuoteComment', () => {
  it('should add a comment in a quote', async () => {
    const { result } = renderHook(() => useAddQuoteComment(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.addComment.mutate({
      quoteId: 'quote-id',
      updateMode: 'ApplyToDraft',
      quoteCommentInput: {
        text: 'test comment',
      },
    })

    await waitFor(() => {
      expect(result.current.addComment.data).toEqual({
        id: 'test-id',
        text: 'test comment',
      })
    })
  })
})
