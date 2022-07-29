import { renderHook } from '@testing-library/react-hooks'

import { createQueryClientWrapper } from '../../../__test__/utils/renderWithQueryClient'
import { userAddressMock } from '@/__mocks__/stories/userAddressMock'
import { useUserAddressesQueries } from '@/hooks'

describe('[hooks] useUserAddress', () => {
  it('should return user address ', async () => {
    const { result, waitFor } = renderHook(() => useUserAddressesQueries({ accountId: 1232 }), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(userAddressMock.customerAccountContacts)
    })
  })
})
