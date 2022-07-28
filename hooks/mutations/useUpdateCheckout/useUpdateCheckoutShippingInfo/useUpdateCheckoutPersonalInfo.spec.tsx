import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutShippingInfo, ShippingInfo } from './useUpdateCheckoutShippingInfo'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

import type { FulfillmentInfoInput } from '@/lib/gql/types'

describe('[hooks] useUpdateCheckoutShippingInfo', () => {
  it('should use useUpdateCheckoutShippingInfo', async () => {
    const checkoutDetails: ShippingInfo = {
      orderId: '13d5570250a9e9000160a0180000678b',
      fulfillmentInfoInput: orderMock.checkout.fulfillmentInfo as FulfillmentInfoInput,
    }

    const expectedFulfillmentContact = orderMock?.checkout?.fulfillmentInfo?.fulfillmentContact

    renderHook(
      async () => {
        const updateShippingInfoMutation = useUpdateCheckoutShippingInfo()
        const response = await updateShippingInfoMutation.mutateAsync(checkoutDetails)

        expect(response.fulfillmentContact).toEqual(expectedFulfillmentContact)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
