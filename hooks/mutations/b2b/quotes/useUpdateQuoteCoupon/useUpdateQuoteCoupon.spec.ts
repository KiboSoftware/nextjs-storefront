import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateQuoteCoupon } from './useUpdateQuoteCoupon'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateQuoteCoupon', () => {
  it('should use useUpdateQuoteCoupon ', async () => {
    const { result } = renderHook(() => useUpdateQuoteCoupon(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateQuoteCoupon.mutateAsync({
      quoteId: 'quote-id',
      couponCode: '10OFF',
      updateMode: 'ApplyToDraft',
    })

    await waitFor(() => {
      expect(result.current.updateQuoteCoupon.data).toStrictEqual(quoteMock?.items?.[0])
    })
  })
})
