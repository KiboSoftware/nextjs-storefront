import { renderHook, waitFor } from '@testing-library/react'

import { useCreateCustomerB2bAccountMutation } from './useCreateCustomerB2bAccount'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'
import { b2BAccountInputMock, b2BAccountResponseMock } from '@/__mocks__/stories'

describe('[hooks] useCreateCustomerB2bAccountMutation', () => {
  it('should add account to hierarchy', async () => {
    const { result } = renderHook(() => useCreateCustomerB2bAccountMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createCustomerB2bAccount.mutateAsync({ ...b2BAccountInputMock })

    await waitFor(() => {
      expect(result.current.createCustomerB2bAccount.data).toStrictEqual(b2BAccountResponseMock)
    })
  })
})
