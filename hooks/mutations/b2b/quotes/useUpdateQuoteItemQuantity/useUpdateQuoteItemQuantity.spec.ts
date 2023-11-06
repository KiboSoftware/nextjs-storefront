import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateQuoteItemQuantity } from './useUpdateQuoteItemQuantity'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateQuoteItemQuantity', () => {
  it('should update quote item quantity', async () => {
    const { result } = renderHook(
      () => useUpdateQuoteItemQuantity({ shouldFetchShippingMethods: true }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    result.current.updateQuoteItemQuantity.mutateAsync({
      quantity: 1,
      quoteId: 'quote-id',
      updateMode: 'Add',
      quoteItemId: 'quote-item-id',
    })

    await waitFor(() =>
      expect(result.current.updateQuoteItemQuantity.data).toStrictEqual(quoteMock?.items?.[0])
    )
  })
})
