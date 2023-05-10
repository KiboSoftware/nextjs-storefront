import { renderHook } from '@testing-library/react-hooks'

import { useGetCards } from './useGetCards'
import { customerAccountCardsMock } from '@/__mocks__/stories/customerAccountCardsMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetCards', () => {
  it('should return customer saved cards', async () => {
    const { result, waitFor } = renderHook(() => useGetCards(1012), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(customerAccountCardsMock.customerAccountCards)
  })
})
