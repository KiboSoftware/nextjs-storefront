import { renderHook } from '@testing-library/react-hooks'

import { useRemoveUserFromGroup } from './useRemoveUserFromGroup'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useRemoveUserFromGroup', () => {
  it('should use useRemoveUserFromGroup', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRemoveUserFromGroup(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.removeUserFromGroup.mutateAsync({
      accountId: 1041,
      groupCode: 'director',
      userId: '92edae78199c45ed8c18d90a111b986c',
    })

    await waitForNextUpdate()
    expect(result.current.removeUserFromGroup.data).toEqual(true)
  })
})
