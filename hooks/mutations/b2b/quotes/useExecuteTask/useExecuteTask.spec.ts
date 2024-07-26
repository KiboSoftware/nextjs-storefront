import { renderHook } from '@testing-library/react-hooks'

import { useExecuteTask } from './useExecuteTask'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'

describe('[hooks] useExecuteTask', () => {
  it('should add a comment in a quote', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useExecuteTask(), {
      wrapper: createQueryClientWrapper(),
    })

    await result.current.executeTask.mutateAsync({
      quoteId: 'quote-id',
      taskName: '',
    })

    await waitForNextUpdate()
    expect(result.current.executeTask.data).toEqual(quoteMock?.items?.[0])
  })
})
