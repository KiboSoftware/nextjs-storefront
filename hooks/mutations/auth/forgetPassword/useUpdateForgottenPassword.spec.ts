import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateForgottenPassword } from './useUpdateForgottenPassword'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateForgottenPassword', () => {
  it('should use useUpdateForgottenPassword when updating passwords', async () => {
    const { result } = renderHook(() => useUpdateForgottenPassword(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateForgottenPassword.mutateAsync({
      userName: 'test-username',
      confirmationCode: 'test-confirmation-code',
      newPassword: 'test-password',
    })
    await waitFor(() => {
      expect(result.current.updateForgottenPassword.data).toStrictEqual(true)
    })
  })
})
