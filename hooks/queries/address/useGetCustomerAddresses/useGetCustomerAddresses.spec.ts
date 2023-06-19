import { renderHook, waitFor } from '@testing-library/react'

import { useGetCustomerAddresses } from './useGetCustomerAddresses'
import { userAddressMock } from '@/__mocks__/stories/userAddressMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetCustomerAddresses', () => {
  it('should return customer saved contacts', async () => {
    const { result } = renderHook(() => useGetCustomerAddresses(1012), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(userAddressMock.customerAccountContacts)
    )
  })
})
