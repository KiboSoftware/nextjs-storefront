import { renderHook, waitFor } from '@testing-library/react'

import { useCreateQuoteItem } from './useCreateQuoteItem'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateQuoteItem', () => {
  it('should create quote item', async () => {
    const { result } = renderHook(() => useCreateQuoteItem({ shouldFetchShippingMethods: true }), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createQuoteItem.mutateAsync({
      product: {
        options: [
          {
            attributeFQN: 'tenant~size',
            value: 'M',
            shopperEnteredValue: null,
          },
        ],
        productCode: 'MS-JKT-002',
        variationProductCode: 'MS-JKT-002-8',
      },
      quantity: 1,
      quoteId: 'quote-id',
      updateMode: 'Add',
    })

    await waitFor(() =>
      expect(result.current.createQuoteItem.data).toStrictEqual(quoteMock?.items?.[0])
    )
  })
})
