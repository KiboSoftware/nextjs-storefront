import { renderHook } from '@testing-library/react-hooks'

import { useAddUserToGroup } from './useAddUserToGroup'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useAddUserToGroup', () => {
  it('should use useAddUserToGroup', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAddUserToGroup(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.addUserToGroup.mutateAsync({
      accountId: 1041,
      groupCode: 'director',
      userId: '92edae78199c45ed8c18d90a111b986c',
    })
    await waitForNextUpdate()
    expect(result.current.addUserToGroup.data).toEqual(true)
  })
})
