import { renderHook } from '@testing-library/react-hooks'

import { useCustomerContactsQueries } from './useCustomerContactsQueries'
import { userAddressMock } from '@/__mocks__/stories/userAddressMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCustomerContactsQueries', () => {
  it('should return customer saved contacts', async () => {
    const { result, waitFor } = renderHook(() => useCustomerContactsQueries(1012), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(userAddressMock.customerAccountContacts)
  })
})
