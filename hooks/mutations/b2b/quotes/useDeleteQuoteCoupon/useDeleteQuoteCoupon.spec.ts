import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteQuoteCoupon } from './useDeleteQuoteCoupon'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteQuoteCoupon', () => {
  it('should use useDeleteQuoteCoupon ', async () => {
    const { result } = renderHook(() => useDeleteQuoteCoupon(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteQuoteCoupon.mutateAsync({
      quoteId: 'quote-id',
      couponCode: '10OFF',
      updateMode: 'ApplyToDraft',
    })

    await waitFor(() => {
      expect(result.current.deleteQuoteCoupon.data).toStrictEqual(quoteMock?.items?.[0])
    })
  })
})
