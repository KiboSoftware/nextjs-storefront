import { renderHook } from '@testing-library/react-hooks'

import { useProductLocationInventory } from './useProductLocationInventory'
import { userAddressMock } from '@/__mocks__/stories/userAddressMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useProductLocationInventory', () => {
  it('should return product inventory by location code', async () => {
    const { result, waitFor } = renderHook(() => useProductLocationInventory('', ''), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(userAddressMock.customerAccountContacts)
  })
})
