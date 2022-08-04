import { renderHook } from '@testing-library/react-hooks'

import { useCustomerCards } from './useCustomerCards'
import { customerAccountCardsMock } from '@/__mocks__/stories/customerAccountCardsMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCustomerCards', () => {
  it('should return customer saved cards', async () => {
    const { result, waitFor } = renderHook(() => useCustomerCards(1012), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(customerAccountCardsMock.customerAccountCards)
  })
})
