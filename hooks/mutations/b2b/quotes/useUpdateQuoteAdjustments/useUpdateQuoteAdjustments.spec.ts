import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateQuoteAdjustments } from './useUpdateQuoteAdjustments'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateQuoteAdjustments', () => {
  it('should update quote adjustments based on handlingAdjustment, adjustment and shipping adjustment', async () => {
    const { result } = renderHook(() => useUpdateQuoteAdjustments(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateQuoteAdjustments.mutateAsync({
      adjustment: 1,
      handlingAdjustment: 1,
      quoteId: 'quote-id',
      shippingAdjustment: 1,
      updateMode: 'update-mode',
    })

    await waitFor(() =>
      expect(result.current.updateQuoteAdjustments.data).toStrictEqual(quoteMock?.items?.[0])
    )
  })
})
