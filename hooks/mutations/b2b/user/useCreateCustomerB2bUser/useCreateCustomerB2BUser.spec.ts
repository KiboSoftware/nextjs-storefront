import { renderHook, waitFor } from '@testing-library/react'

import { useCreateCustomerB2bUserMutation } from './useCreateCustomerB2bUser'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockB2BUserAccount =
  customerB2BUserForPage0Mock?.items && customerB2BUserForPage0Mock?.items[0]
const { firstName, lastName, emailAddress }: any = mockB2BUserAccount
const createB2BUserInput = {
  accountId: 1001,
  b2BUserAndAuthInfoInput: {
    b2BUser: {
      firstName,
      lastName,
      emailAddress,
      userName: emailAddress,
      localeCode: 'en-IN',
    },
  },
}

describe('[hooks] useCreateCustomerB2bUserMutation', () => {
  it('should add item to users', async () => {
    const { result } = renderHook(() => useCreateCustomerB2bUserMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createCustomerB2bUser.mutateAsync({
      ...createB2BUserInput,
    })

    await waitFor(() => {
      expect(result.current.createCustomerB2bUser.data).toStrictEqual(mockB2BUserAccount)
    })
  })
})
