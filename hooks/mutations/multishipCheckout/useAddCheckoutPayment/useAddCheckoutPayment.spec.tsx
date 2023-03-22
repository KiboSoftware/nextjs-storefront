import { renderHook } from '@testing-library/react-hooks'

import { useAddCheckoutPayment } from './useAddCheckoutPayment'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useAddCheckoutPayment', () => {
  it('should use useAddCheckoutPayment', async () => {
    renderHook(
      async () => {
        const createCheckoutPayment = useAddCheckoutPayment()
        const response = await createCheckoutPayment.mutateAsync({
          checkoutId: '137a94b6402be000013718d80000678b',
          paymentAction: {},
        })
        expect(response).toStrictEqual(checkoutMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
