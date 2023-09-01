import { renderHook, waitFor } from '@testing-library/react'

import { useGetQuoteShippingMethods } from './useGetQuoteShippingMethods'
import { shippingRateMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetQuoteShippingMethods', () => {
  it('should return quote data based on id', async () => {
    const { result } = renderHook(
      () =>
        useGetQuoteShippingMethods({
          quoteId: 'quote-id',
          draft: true,
          enabled: true,
        }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )
    // await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() =>
      expect(result.current.data).toStrictEqual(shippingRateMock?.orderShipmentMethods)
    )
  })
})
