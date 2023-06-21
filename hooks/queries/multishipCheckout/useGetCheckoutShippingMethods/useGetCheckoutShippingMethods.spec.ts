import { renderHook, waitFor } from '@testing-library/react'

import { useGetCheckoutShippingMethods } from './useGetCheckoutShippingMethods'
import { checkoutGroupRatesMock } from '@/__mocks__/stories/CheckoutGroupRatesMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetCheckoutShippingMethods', () => {
  it('should return checkout shipping methods', async () => {
    const { result } = renderHook(
      () => useGetCheckoutShippingMethods('checkoutId-1', 'selectedShippingAddressId-1'),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() =>
      expect(result.current.data).toEqual(checkoutGroupRatesMock.checkoutShippingMethods)
    )
  })
})
