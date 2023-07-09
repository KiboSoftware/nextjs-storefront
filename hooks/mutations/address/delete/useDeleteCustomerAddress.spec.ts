import { renderHook } from '@testing-library/react'

import { useDeleteCustomerAddress } from './useDeleteCustomerAddress'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCustomerAddress', () => {
  it('should use useDeleteCustomerAddress ', async () => {
    const deleteCustomerAddressVars = {
      accountId: 123,
      contactId: 456,
    }

    const { result } = renderHook(() => useDeleteCustomerAddress(), {
      wrapper: createQueryClientWrapper(),
    })

    const response = await result.current.deleteCustomerAddress.mutateAsync(
      deleteCustomerAddressVars
    )

    expect(response).toBeTruthy()
  })
})
