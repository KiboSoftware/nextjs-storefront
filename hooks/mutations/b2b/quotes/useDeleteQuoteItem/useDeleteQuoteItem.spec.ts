import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteQuoteItem } from './useDeleteQuoteItem'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteQuoteItem', () => {
  it('should use useDeleteQuoteItem when deleteCartItem', async () => {
    const { result } = renderHook(() => useDeleteQuoteItem({ shouldFetchShippingMethods: true }), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteQuoteItem.mutateAsync({
      quoteItemId: 'quote-item-id',
      quoteId: 'quote-id',
      updateMode: 'update-mode',
    })

    await waitFor(() => {
      expect(result.current.deleteQuoteItem.data).toEqual(true)
    })
  })
})
