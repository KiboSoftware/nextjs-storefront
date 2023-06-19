import { renderHook } from '@testing-library/react'

import { useUpdateOrderShippingInfo } from './useUpdateOrderShippingInfo'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateOrderShippingInfo', () => {
  it('should use useUpdateOrderShippingInfo', async () => {
    const expectedFulfillmentContact = orderMock?.checkout?.fulfillmentInfo?.fulfillmentContact

    renderHook(
      async () => {
        const { updateOrderShippingInfo } = useUpdateOrderShippingInfo()
        const response = await updateOrderShippingInfo.mutateAsync({
          checkout: orderMock.checkout,
        })

        expect(response.fulfillmentContact).toEqual(expectedFulfillmentContact)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
