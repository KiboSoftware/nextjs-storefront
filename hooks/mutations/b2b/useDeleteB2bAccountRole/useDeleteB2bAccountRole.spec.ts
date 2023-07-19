import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteB2bAccountRoleMutation } from './useDeleteB2bAccountRole'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockB2BUserAccount =
  customerB2BUserForPage0Mock?.items && customerB2BUserForPage0Mock?.items[0]
const { userId }: any = mockB2BUserAccount

const removeB2BUserInput = {
  accountId: 1001,
  userId,
  roleId: 1,
}

describe('[hooks] useDeleteB2bAccountRoleMutation', () => {
  it('should delete item from users', async () => {
    const { result } = renderHook(() => useDeleteB2bAccountRoleMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteB2bAccountUserRole.mutateAsync(removeB2BUserInput)

    await waitFor(() => {
      expect(result.current.deleteB2bAccountUserRole.data).toBe(true)
    })
  })
})
