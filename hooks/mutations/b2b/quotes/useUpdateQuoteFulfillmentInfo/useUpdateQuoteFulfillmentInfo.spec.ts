import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateQuoteFulfillmentInfo } from './useUpdateQuoteFulfillmentInfo'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

import { Quote } from '@/lib/gql/types'

describe('[hooks] useUpdateQuoteFulfillmentInfo', () => {
  it('should update quote fulfillment info based on contact, shippingMethodsName and code', async () => {
    const { result } = renderHook(
      () => useUpdateQuoteFulfillmentInfo({ shouldFetchShippingMethods: false }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    result.current.updateQuoteFulfillmentInfo.mutateAsync({
      quoteId: 'quote-id',
      quote: quoteMock?.items?.[0] as Quote,
      updateMode: 'update-mode',
      contact: undefined,
      email: undefined,
      shippingMethodCode: undefined,
      shippingMethodName: undefined,
    })

    await waitFor(() =>
      expect(result.current.updateQuoteFulfillmentInfo.data).toStrictEqual(quoteMock?.items?.[0])
    )
  })
})
