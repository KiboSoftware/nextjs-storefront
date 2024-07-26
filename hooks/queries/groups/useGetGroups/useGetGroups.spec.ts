import { renderHook } from '@testing-library/react-hooks'

import { useGetGroups } from './useGetGroups'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'
const groupsList = [
  {
    accountId: 1100,
    code: 'manager',
    name: 'Manager',
    description: 'Manager',
  },
  {
    accountId: 1100,
    code: 'admin',
    name: 'Admin',
    description: 'admin',
  },
]
describe('[hooks] useGetGroups', () => {
  it('should use useGetGroups', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetGroups(), {
      wrapper: createQueryClientWrapper(),
    })
    await waitForNextUpdate()
    console.log('result.current', result.current)
    expect(result.current.data).toEqual(groupsList)
  })
})
