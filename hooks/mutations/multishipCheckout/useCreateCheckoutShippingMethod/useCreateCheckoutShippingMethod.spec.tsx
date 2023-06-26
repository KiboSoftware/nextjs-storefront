import { renderHook, waitFor } from '@testing-library/react'

import { useCreateCheckoutShippingMethod } from './useCreateCheckoutShippingMethod'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckoutShippingMethod', () => {
  it('should create checkout shipping method', async () => {
    const { result } = renderHook(() => useCreateCheckoutShippingMethod(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createCheckoutShippingMethod.mutateAsync({
      checkoutId: '137a94b6402be000013718d80000678b',
      checkoutGroupShippingMethodInput: [
        {
          groupingId: '3h4hj2hb4j42',
          shippingRate: {},
        },
      ],
    })

    await waitFor(() => {
      expect(result.current.createCheckoutShippingMethod.data).toStrictEqual(checkoutMock.checkout)
    })
  })
})
