import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutShippingInfo } from './useUpdateCheckoutShippingInfo'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutShippingInfo', () => {
  it('should use useUpdateCheckoutShippingInfo', async () => {
    const expectedFulfillmentContact = orderMock?.checkout?.fulfillmentInfo?.fulfillmentContact

    renderHook(
      async () => {
        const updateShippingInfoMutation = useUpdateCheckoutShippingInfo()
        const response = await updateShippingInfoMutation.mutateAsync({
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
