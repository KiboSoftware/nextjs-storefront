import { renderHook, waitFor } from '@testing-library/react'

import { useRemoveCustomerB2bUserMutation } from './useRemoveCustomerB2bUser'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockB2BUserAccount =
  customerB2BUserForPage0Mock?.items && customerB2BUserForPage0Mock?.items[0]
const { userId }: any = mockB2BUserAccount

const removeB2BUserInput = {
  accountId: 1001,
  userId,
}

describe('[hooks] useRemoveCustomerB2bUserMutation', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should delete item from users', async () => {
    const { result } = renderHook(
      () => useRemoveCustomerB2bUserMutation({ removeCustomerB2bAccountUser: true, delay: 1000 }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    result.current.removeCustomerB2bUser.mutateAsync(removeB2BUserInput)

    await waitFor(() => {
      expect(result.current.removeCustomerB2bUser.data).toBe(true)
    })
  })
})
