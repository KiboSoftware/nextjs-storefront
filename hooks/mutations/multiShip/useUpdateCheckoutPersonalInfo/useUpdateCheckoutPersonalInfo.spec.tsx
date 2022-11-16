import { renderHook } from '@testing-library/react-hooks'

import { useUpdateMultiShipCheckoutPersonalInfo } from './useUpdateCheckoutPersonalInfo'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

import { CheckoutInput } from '@/lib/gql/types'

describe('[hooks] useUpdateMultiShipCheckoutPersonalInfo', () => {
  it('should use useUpdateMultiShipCheckoutPersonalInfo', async () => {
    renderHook(
      async () => {
        const updatePersonalInfoMutation = useUpdateMultiShipCheckoutPersonalInfo()
        const response = await updatePersonalInfoMutation.mutateAsync({
          checkoutId: '',
          checkoutInput: {} as CheckoutInput,
        })

        expect(response).toEqual(checkoutMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
