import { renderHook, waitFor } from '@testing-library/react'

import { useChangeB2bAccountParentMutation } from './useChangeB2bAccountParent'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useChangeB2bAccountParentMutation', () => {
  it('should change parent of the account', async () => {
    const { result } = renderHook(() => useChangeB2bAccountParentMutation(1004), {
      wrapper: createQueryClientWrapper(),
    })

    const account = b2BAccountHierarchyResult?.accounts?.[2]
    const parentAccount = b2BAccountHierarchyResult?.accounts?.[0]
    const changeB2bAccountParentInputMock = {
      accountId: account.id,
      parentAccountId: parentAccount.id,
    }

    result.current.changeB2bAccountParent.mutateAsync(changeB2bAccountParentInputMock)

    await waitFor(() => {
      expect(result.current.changeB2bAccountParent.data).toStrictEqual({
        ...account,
        parentAccountId: parentAccount.id,
      })
    })
  })
})
