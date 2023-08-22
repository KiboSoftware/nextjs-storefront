import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateCustomerB2bUserMutation } from './useUpdateCustomerB2bUser'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockB2BUserAccount =
  customerB2BUserForPage0Mock?.items && customerB2BUserForPage0Mock?.items[0]
const { firstName, lastName, emailAddress, userId }: any = mockB2BUserAccount

const updateB2BUserInput = {
  accountId: 1001,
  userId,
  b2BUserInput: {
    firstName,
    lastName,
    emailAddress,
    userName: emailAddress,
    localeCode: 'en-IN',
  },
}

describe('[hooks] useUpdateCustomerB2bUserMutation', () => {
  it('should update item in users', async () => {
    const { result } = renderHook(() => useUpdateCustomerB2bUserMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateCustomerB2bUser.mutateAsync({
      ...updateB2BUserInput,
    })

    await waitFor(() => {
      expect(result.current.updateCustomerB2bUser.data).toStrictEqual(mockB2BUserAccount)
    })
  })
})
