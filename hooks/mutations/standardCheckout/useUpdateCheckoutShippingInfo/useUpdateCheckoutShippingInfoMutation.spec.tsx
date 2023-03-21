import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutShippingInfoMutation } from './useUpdateCheckoutShippingInfoMutation'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutShippingInfoMutation', () => {
  it('should use useUpdateCheckoutShippingInfoMutation', async () => {
    const expectedFulfillmentContact = orderMock?.checkout?.fulfillmentInfo?.fulfillmentContact

    renderHook(
      async () => {
        const updateShippingInfoMutation = useUpdateCheckoutShippingInfoMutation()
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
