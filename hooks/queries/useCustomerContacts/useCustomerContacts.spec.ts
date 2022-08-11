import { renderHook } from '@testing-library/react-hooks'

import { useCustomerContacts } from './useCustomerContacts'
import { userAddressMock } from '@/__mocks__/stories/userAddressMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCustomerContacts', () => {
  it('should return customer saved contacts', async () => {
    const { result, waitFor } = renderHook(() => useCustomerContacts(1012), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(userAddressMock.customerAccountContacts)
  })
})
