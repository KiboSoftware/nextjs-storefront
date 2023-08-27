import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateCustomerB2bAccountMutation } from './useUpdateCustomerB2bAccount'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'
import { b2BAccountInputMock, b2BAccountResponseMock } from '@/__mocks__/stories'

describe('[hooks] useUpdateCustomerB2bAccountMutation', () => {
  it('should add account to hierarchy', async () => {
    const { result } = renderHook(() => useUpdateCustomerB2bAccountMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateCustomerB2bAccount.mutateAsync({ ...b2BAccountInputMock, accountId: 1023 })

    await waitFor(() => {
      expect(result.current.updateCustomerB2bAccount.data).toStrictEqual(b2BAccountResponseMock)
    })
  })
})
