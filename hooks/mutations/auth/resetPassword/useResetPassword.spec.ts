import { renderHook } from '@testing-library/react'

import { useResetPassword } from './useResetPassword'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useResetPassword', () => {
  it('should use useResetPassword', async () => {
    const resetPasswordMutationVars = {
      emailAddress: 'sss@email.com ',
      userName: 'sss',
      customerSetCode: '123456',
    }

    const { result } = renderHook(() => useResetPassword(), {
      wrapper: createQueryClientWrapper(),
    })
    const response = await result.current.resetPassword.mutateAsync(resetPasswordMutationVars)
    expect(response).toBeTruthy()
  })
})
