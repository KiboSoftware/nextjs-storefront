import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCustomerData } from './useUpdateCustomerData'
import { userResponseMock } from '@/__mocks__/stories/UserMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const useUpdateCustomerDataParams = {
  accountId: 1074,
  customerAccountInput: {
    id: 1074,
    firstName: 'Suman',
    lastName: 'Patro',
    emailAddress: 'suman@email.com',
  },
}

describe('[hooks] useUpdateCustomerData', () => {
  it('should use useUpdateCustomerData', async () => {
    renderHook(
      async () => {
        const { updateUserData } = useUpdateCustomerData()
        const response = await updateUserData.mutateAsync(useUpdateCustomerDataParams)

        expect(response).toStrictEqual(userResponseMock.CustomerAccount)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
