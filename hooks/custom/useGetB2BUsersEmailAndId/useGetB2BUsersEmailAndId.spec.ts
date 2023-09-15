import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useGetB2BUsersEmailAndId } from './useGetB2BUsersEmailAndId'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'

jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({ isAuthenticated: true, user: { id: 1 } }),
}))

describe('useGetB2BUsersWithUserId', () => {
  it('should return key value pairs of userId and email Address', async () => {
    const userIdToEmail: { [userId: string]: string } = {}

    customerB2BUserForPage0Mock?.items?.forEach((item) => {
      userIdToEmail[item?.userId as string] = item?.emailAddress as string
    })
    const { result } = renderHook(() => useGetB2BUsersEmailAndId(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current).toEqual(userIdToEmail)
    })
  })
})
