import { renderHook } from '@testing-library/react-hooks'

import { useCreateCheckoutShippingMethodMutation } from './useCreateCheckoutShippingMethodMutation'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckoutShippingMethodMutation', () => {
  it('should use useCreateCheckoutShippingMethodMutation', async () => {
    renderHook(
      async () => {
        const createCheckoutPayment = useCreateCheckoutShippingMethodMutation()
        const response = await createCheckoutPayment.mutateAsync({
          checkoutId: '137a94b6402be000013718d80000678b',
          checkoutGroupShippingMethodInput: [
            {
              groupingId: '3h4hj2hb4j42',
              shippingRate: {},
            },
          ],
        })
        expect(response).toStrictEqual(checkoutMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
