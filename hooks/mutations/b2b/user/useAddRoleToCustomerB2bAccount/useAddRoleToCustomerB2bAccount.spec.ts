import { renderHook, waitFor } from '@testing-library/react'

import { useAddRoleToCustomerB2bAccountMutation } from './useAddRoleToCustomerB2bAccount'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockB2BUserAccount =
  customerB2BUserForPage0Mock?.items && customerB2BUserForPage0Mock?.items[1]
const { userId }: any = mockB2BUserAccount

const addRoleToB2BUserInput = {
  accountId: 1001,
  userId,
  roleId: 1,
}

describe('[hooks] useAddRoleToCustomerB2bAccountMutation', () => {
  it('should add role to customer b2b account users', async () => {
    const { result } = renderHook(() => useAddRoleToCustomerB2bAccountMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.addRoleToCustomerB2bAccount.mutateAsync(addRoleToB2BUserInput)

    await waitFor(() => {
      expect(result.current.addRoleToCustomerB2bAccount.data).toBe(true)
    })
  })
})
