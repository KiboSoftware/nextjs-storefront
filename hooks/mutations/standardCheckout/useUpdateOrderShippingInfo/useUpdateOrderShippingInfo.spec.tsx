import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateOrderShippingInfo } from './useUpdateOrderShippingInfo'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateOrderShippingInfo', () => {
  it('should use useUpdateOrderShippingInfo', async () => {
    const expectedFulfillmentContact = orderMock?.checkout?.fulfillmentInfo?.fulfillmentContact

    const { result } = renderHook(() => useUpdateOrderShippingInfo(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateOrderShippingInfo.mutateAsync({
      checkout: orderMock.checkout,
    })

    await waitFor(() => {
      expect(result.current.updateOrderShippingInfo.data.fulfillmentContact).toEqual(
        expectedFulfillmentContact
      )
    })
  })
})
