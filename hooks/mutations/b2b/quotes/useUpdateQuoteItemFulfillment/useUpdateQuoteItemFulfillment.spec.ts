import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateQuoteItemFulfillment } from './useUpdateQuoteItemFulfillment'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateQuoteItemFulfillment', () => {
  it('should update quote item fulfillment', async () => {
    const { result } = renderHook(
      () => useUpdateQuoteItemFulfillment({ shouldFetchShippingMethods: true }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    result.current.updateQuoteItemFulfillment.mutateAsync({
      product: {
        options: [
          {
            attributeFQN: 'tenant~size',
            value: 'M/L',
            shopperEnteredValue: null,
          },
        ],
        productCode: 'MS-SHIRT-002',
        variationProductCode: 'MS-SHIRT-002-1',
      },
      quantity: 1,
      quoteId: 'quote-id',
      quoteItemId: 'quote-item-id',
      updateMode: 'Add',
      fulfillmentMethod: 'Pickup',
      locationCode: 'location-code',
    })

    await waitFor(() =>
      expect(result.current.updateQuoteItemFulfillment.data).toStrictEqual(quoteMock?.items?.[0])
    )
  })
})
