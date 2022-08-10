import { renderHook } from '@testing-library/react-hooks'

import { useCustomerContacts } from './useCustomerContacts'
import { getUserAddressesMock } from '@/__mocks__/stories/getUserAddressesMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCustomerContacts', () => {
  it('should return customer saved contacts', async () => {
    const { result, waitFor } = renderHook(() => useCustomerContacts(1012), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(getUserAddressesMock.customerAccountContacts)
  })
})
